/**
 * Created by lintao_alex on 2020/2/19
 *
 * You should give a function which return a Promise to be the param of the constructor
 * So request action will not start until you call pms
 * You can use the function "depend" to make the relationship
 * You can set the property "cache" to false if the data which you request is not static
 */
export class Node<T> {
  private _dependenceList: Node<any>[] = [];

  private _pms: Promise<T>;

  constructor(
    private _pmsCreator: (...args: any[])=>Promise<T>,
    public cache = true
  ) {}

  get pms() {
    if(this._dependenceList.length==0) return this.getThisPms();
    return Promise.all(this._dependenceList.map(node=>node.pms)).then(args=>{
      return this.getThisPms(args)
    })
  }

  private getThisPms(args?: any[]) {
    let out = this._pms;
    if(this.cache && out) return out
    //No need for judge here. No mater no cache or null out, you need a new promise
    out = this._pmsCreator.apply(null, args);
    this._pms = out;
    return out;
  }

  depend(node: Node<any>) {
    this._dependenceList.push(node)
  }
}
