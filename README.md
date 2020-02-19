# DataPyramid
### A tool helping you to allocate and get async data which has a complex relationship on dependence easily

# Consider this situation in your developing
- You need to use an async data right now in your app
- But you should request a lot of other async data which it depend on
- How terrible, the other async data also has a complex dependence on each other, that make the relationship seems like a pyramid

## This tool may help

# Getting started to see the demo
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

## You will see the data be requested one by one
## You can see how to use in the file test.ts