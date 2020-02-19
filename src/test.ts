import {Node} from "./core/Node";

function createPms(...args:any[]) {
  return new Promise<any>((resolve)=> {
    setTimeout(()=>{
      console.log('resolve ',args)
      resolve(args)
    }, Math.random()*3000+1000)
  })
}

let a = new Node(()=>{return createPms('a')});
//only b will be shown again if you recall "c.pms"
let b = new Node(()=>{return createPms('b')}, false);
let b2 = new Node(()=>{return createPms('b2')});
let c = new Node(createPms)
b.depend(a)
c.depend(b)
c.depend(b2)

c.pms

export {a,b,b2,c}

