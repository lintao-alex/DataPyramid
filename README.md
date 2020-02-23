# DataPyramid
[![Build Status](https://www.travis-ci.org/lintao-alex/DataPyramid.svg?branch=master)](https://www.travis-ci.org/lintao-alex/DataPyramid)
### A tool helping you to allocate and get async data which has a complex relationship on dependence easily

# Consider this situation in your developing
- You need to use an async data right now in your app
- But you should request a lot of other async data which it depend on
- How terrible, the other async data also has a complex dependence on each other, that make the relationship seems like a pyramid

### This tool may help

# What can it do more than Promise?
In fact, you can just use promise to play with the situation above.
But here. I'd like to do something more:

Object reuse and combination

allocate just once

no more care about the relationship

First, let's make some rules:

`X-->Y:
It means X and Y are both async data which you should call some api to get.
And to get Y, you should get X first, then use some data from X as the params to get B.
`

`
[A,B]-->C:
Base on above, it means you must get both A and B, then C could be get
`

Here is a real example in weChat miniprogram development: to get the phone number of user
How much async data should we prepare?
- L = wx-login-code 
- S = session-key (which may expire, we will deal it later)
- E = encrypted-data
- P = phone-number (the purpose)

And here is the relationship:

`L-->S; [S,E]-->P`

In this tool, you can follow this steps:

- 1.Create Each request task by "Class Node" which comes from data-pyramid. You need not to care about the order. Because every task will not start until you use "Node::pms". The first constructor param is a function than return the request Promise
```
function pmsCreater(...args){.....} // just for example, you can do it as you like.
const P = new Node(pmsCreater_P);
const S = new Node(pmsCreater_S);
const E = new Node(pmsCreater_E);
const L = new Node(pmsCreater_L);
```
- 2.allocate the relationship by "Node::depend"
```
S.depend(L);
P.depend(S, E);
```
- 3.just call the phone whenever and wherever, the previous data will be requested automatic according to the relationship
```
let phoneNumber = await P.pms;
// no need to care about the relationship any more, just need to allocate them once
// you can use it more then once
// as you can see, not only the "P" can be used like this, "S" is in the same logic
```
Let's talk about some detail:
- How to pass the request param which come from other API?
Remember the '...args' that appear on the Promise create function. 
They are just the necessary data which you pick up from previous request. And how to make sure the previous request 
can pass them in a right way? You must resolve them in the same order in the Promise from previous Promise create 
function.
- Will the previous API be called again when I use the pms of the last purpose again?
The second param of Node constructor name "cache", and its default value is 'true'. So the answer is No! However, what if one 
of the request data is changeable, you know what to do. (It's also friendly to the data who will expire)

Some tips to make it more comfortable:
- Some async data may not change any more when it meet some condition:
You can set the cache to 'false' when create the Node. And set it to 'true' when the condition come, in the 
Promise creator

What's more in the future:
For now, I am trying to make a tool that helps allocate relationship easier when there is a lot of request, and
the relationship comes real complex.
### Pay attention: it's helpful in static relationship. If the relationship is changeable, make more Node
On the other hand, if you run into some trouble about async data, thanks for leaving it in my issues.
We can pick up a good requirement and satisfy it together!

# Now it can be used directly from npm
```
npm i data-pyramid -S
```
```
const dp = require('data-pyramid')
var task = new dp.Node(pmsCreator)
function pmsCreator(...args){...}
```

# Getting started for sourcecode
- Clone the repository
```
git clone https://github.com/lintao-alex/DataPyramid.git
```
- Install dependencies
```
npm install
```
- Run this two command
```
npm run tsc
npm run test
```

## You will see the data come out by dependence
## You can see how to use in "test/test.ts"
