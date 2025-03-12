const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

class Ears{
    constructor(){
        this.vad = null;
        this.recognition = null;

        this.speechStartListeners = [];
        this.speechStopListeners = [];
        this.recognitionResultListeners = [];
    }

    async startListening(){
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.lang = "en-US";
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.recognition.onspeechstart = () => {
            this.handleSpeechStartCallbacks();
        }

        this.recognition.onspeechend = () => {
            this.handleSpeechStopCallbacks();
        };

        this.recognition.onresult = (event)=>{
            this.handleRecognitionResultCallbacks(event.results[0][0].transcript);
            //console.log(event.results[0][0].transcript);
        };

        this.recognition.start();

        /*this.vad = await vad.MicVAD.new({
            onSpeechStart: () => {
                this.handleSpeechStartCallbacks();
            },
            onSpeechEnd: (audio) => {
                this.handleSpeechStopCallbacks();
            }
        });
        this.vad.start();*/
    }

    stopListening(){
        if(this.recognition!==null){
            this.recognition.stop();
        }
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

    addRecognitionResultListener(callback){
        this.addListener(callback, this.recognitionResultListeners);
    }

    ///
    /// handlers
    ///

    handleCallback(callbackList){
        for(let i=0;i<callbackList.length;i++){
            callbackList[i]();
        }
    }

    handleArgCallback(arg, callbackList){
        for(let i=0;i<callbackList.length;i++){
            callbackList[i](arg);
        }
    }

    handleSpeechStartCallbacks(){
        this.handleCallback(this.speechStartListeners);
    }

    handleSpeechStopCallbacks(){
        this.handleCallback(this.speechStopListeners);
    }

    handleRecognitionResultCallbacks(res){
        this.handleArgCallback(res, this.recognitionResultListeners);
    }
}