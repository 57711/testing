enum State {
    Pending,
    Fulfilled,
    Rejected,
}
type Handler = {
    handleOnFulfilled: (value: any) => void;
    handleOnRejected: (value: any) => void;
}

class MyPromise {
    private state = State.Pending;
    private result?: any;
    private handlersQueue: Handler[] = [];
    constructor(
        executor: (
            resolve: (value: any | MyPromise) => void,
            reject: (reason?: any) => void
        ) => void
    ) {
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }

    private resolve = (value: any | MyPromise) => {
        if (this.state !== State.Pending) {
            return
        }
        if (typeof value.then === 'function') {
            value.then(this.resolve, this.reject);
            return
        }
        this.state = State.Fulfilled;
        this.result = value;
        console.log('resolve handlersQueue', this.handlersQueue)
        this.executeHandlers();
    }
    private reject = (reason?: any) => {
        if (this.state !== State.Pending) {
            return
        }
        if (typeof reason.then === 'function') {
            reason.then(this.resolve, this.reject);
            return;
        }
        this.state = State.Rejected;
        this.result = reason;
        this.executeHandlers();
    }

    private executeHandlers = () => {
        if (this.state === State.Pending) {
            return
        }
        setTimeout(() => {
            console.log('executeHandlers', this.handlersQueue)
            this.handlersQueue.forEach(handler => {
                if (this.state === State.Fulfilled) {
                    handler.handleOnFulfilled(this.result)
                } else {
                    handler.handleOnRejected(this.result)
                }
            })
            this.handlersQueue = []
        }, 0)
    }
    then = (
        onFulfilled?: (value: any) => any | MyPromise,
        onRejected?: (value: any) => any | MyPromise
    ) => {
        const newPromise = new MyPromise((resolve: any, reject: any) => {
            const handler = {
                handleOnFulfilled: (value: any) => {
                    if (!onFulfilled || typeof onFulfilled !== 'function') {
                        // 值穿透
                        resolve(value)
                    } else {
                        try {
                            resolve(onFulfilled(value as any | MyPromise))
                        } catch (error) {
                            reject(error)
                        }
                    }
                },
                handleOnRejected: (reason: any) => {
                    if (!onRejected || typeof onRejected !== 'function') {
                        // 值穿透
                        resolve(reason)
                    } else {
                        try {
                            resolve(onRejected(reason as any | MyPromise))
                        } catch (error) {
                            reject(error)
                        }
                    }
                },
            }
            this.handlersQueue.push(handler)
            this.executeHandlers()
        })

        //  返回promise，链式调用
        return newPromise
    }
    catch = (
        onRejected?: (reason: any) => any | MyPromise
    ) => {
        return this.then(undefined, onRejected)
    }
    finally = (
        onFinally?: () => void
    ) => {
        return this.then(
            (value) => {
                onFinally && onFinally()
                return value
            },
            (reason) => {
                onFinally && onFinally()
                throw reason
            }
        )
    }
}

const demo = new MyPromise((resolve, reject) => {
    console.log('inside new MyPromise')
    // setTimeout(() => {
        console.log('inside setTimeout')
        resolve('ok')
    // }, 3000);
})
const bb = demo.then((value) => {
    console.log('then', value)
})
console.log(bb)

/** async await  */
var asyncToGenerator = (generatorFunc) => {
    const gen = generatorFunc()
    const asyncStep = (gen, val?) => {
        const {value, done} = gen.next(val)
        if(!done){
            return value.then(res => {
                return asyncStep(gen, res)
            })
        } else {
            return value
        }
    }
    return asyncStep(gen)
}
/** test */
const getData = (val) => new Promise(resolve => setTimeout(() => resolve(val), 2000))
const resPromise = asyncToGenerator(function * (){
    const data1 = yield getData('data1')
    console.log(data1)
    const data2 = yield getData('data2')
    console.log(data2)
    return 'success'
})
resPromise.then(res => console.log(res))
