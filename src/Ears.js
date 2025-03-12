class Ears{
    constructor(){
        this.vad = null;
    }

    async startListening(){
        this.vad = await vad.MicVAD.new({
            onSpeechStart: () => {
                console.log("Speech start detected")
            },
            onSpeechEnd: (audio) => {
                console.log("speech stopped");
            }
        });
        this.vad.start();
    }
}