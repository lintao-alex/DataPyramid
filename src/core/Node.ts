/**
 * Created by lintao_alex on 2020/2/19
 *
 * You should give a function which return a Promise to be the param of the constructor
 * So request action will not start until you call pms
 * You can use the function "depend" to make the relationship
 * You can set the property "cache" to false if the data which you request is not static
 */
export class Node<T> {
  static DEFAULT_CACHE = true

  private _dependenceList: Node<any>[] = []

  private _pms: Promise<T>|undefined

  constructor(
    private _pmsCreator: (...args: any[]) => Promise<T>,
    // if you switch cache from false to true, it will give you the last request data when you call pms
    public cache = Node.DEFAULT_CACHE,
  ) {}

  get pms(): Promise<T> {
    if (this._dependenceList.length === 0) return this.getThisPms()
    return Promise.all(this._dependenceList.map(node => node.pms)).then(args => {
      return this.getThisPms(args)
    })
  }

  _resetCreator(value: (...args: any[])=>Promise<T>) {
    this._pmsCreator = value
    this._pms = undefined;
  }

  private getThisPms(args?: any[]):Promise<T> {
    let out = this._pms
    if (this.cache && out) return out
    // No need for judge here. No mater no cache or null out, you need a new promise
    out = this._pmsCreator.apply(null, args || [])
    this._pms = out
    return out
  }

  depend(...node: Node<any>[]) {
    this._dependenceList.push(...node)
  }
}
