class MyPromise {
    constructor(executor){
        this.state = "PENDING",
        this.value = undefined,
        this.reason = undefined,
        this.onFulfilledCallback = [],
        this.onRejectedCallback = []

        const resolve = (value)=>{
            if(this.state === "PENDING"){
                this.state = "FULFILLED",
                this.value = value
                this.onFulfilledCallback.forEach((item)=>item())
            }
        }

        const reject = (reason) =>{
            if(this.state === "PENDING"){
                this.state === "REJECTED"
                this.reason === reason
                this.onRejectedCallback.forEach(item =>item())
            }
        }

        try{
            executor(resolve,reject)
        }catch(err){
            reject(err)
        }
    }

    then(){

    }
    catch(){

    }
}


new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(123)
        console.log(1231)
    },0)
}).then(()=>{
    console.log(1123)
})
console.log(456)