import {Node} from "./core/Node";

//the help function that simulate you action of request async data
function createPms(...args:any[]) {
  return new Promise<any>((resolve)=> {
    setTimeout(()=>{
      console.log('resolve ',args)
      resolve(args)
    }, Math.random()*3000+1000)
  })
}

//create every Node you need by giving them then function which return a Promise
let a = new Node(()=>{return createPms('a')});
//only b will be shown again if you recall "c.pms"
let b = new Node(()=>{return createPms('b')}, false);
let b2 = new Node(()=>{return createPms('b2')});
//the last one show the args pass by it's dependence. because you may request it by the prev response
let c = new Node(createPms)

Node.DEFAULT_CACHE = false
//after this, all new Node will not cache if you don't set it's cache to true
let d = new Node(()=>{return createPms('d')})
let d2 = new Node(()=>{return createPms('d2')})

//allocate the relationship
b.depend(a)
c.depend(b, b2)
b2.depend(d,d2)


//call the one you need
c.pms

export {a,b,b2,c}

