class Ears{
    constructor(){
        this.vad = null;
        this.speechStartListeners = [];
        this.speechStopListeners = [];
    }

    async startListening(){
        this.vad = await vad.MicVAD.new({
            onSpeechStart: () => {
                this.handleSpeechStartCallbacks();
            },
            onSpeechEnd: (audio) => {
                this.handleSpeechStopCallbacks();
            }
        });
        this.vad.start();
    }

    ///
    /// listeners
    ///

    addListener(callback, callbackList){
        callbackList.push(callback);
    }

    addSpeechStartListener(callback){
        this.addListener(callback, this.speechStartListeners);
    }

    addSpeechStopListener(callback){
        this.addListener(callback, this.speechStopListeners);
    }

    ///
    /// handlers
    ///

    handleCallback(callbackList){
        for(let i=0;i<callbackList.length;i++){
            callbackList[i]();
        }
    }

    handleSpeechStartCallbacks(){
        this.handleCallback(this.speechStartListeners);
    }

    handleSpeechStopCallbacks(){
        this.handleCallback(this.speechStopListeners);
    }
}