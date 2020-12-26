/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */


import MicroModal from 'micromodal'; 

 class WalletProviderCore {

    /**
     * default config
     */
    private config = {
        providers: ["ethereum_provider"],
        modalClass: "",
        modalTitle: "Select Provider"
    }

    //modal
    private modalId: string = "" 

    private isModalVisible: false;

    //  events
    eventNames = ["modalOpen","modalClose","connect","disconnect"];
    registeredEvents: any = {};

    constructor(options = {}){

        if(typeof options != 'object'){
            throw new Error("options_must_be_object")
        }

        this.config = Object.assign(this.config,options);

        if(!this.config.providers.includes("ethereum_provider")){
            this.config.providers.push("ethereum_provider")
        }

        MicroModal.init({
            onShow: this._onModalShow,
            onClose: this._onModalClose,
            //openTrigger: 'data-wallet-provider-open', 
            //closeTrigger: 'data-wallet-provider-close', 
            openClass: 'is-open',
            disableScroll: true,
            disableFocus: false,
            awaitOpenAnimation: false, 
            awaitCloseAnimation: false,
            debugMode: true
        });
       
        this.modalId = `${Date.now()}-${Math.floor(Math.random() * 9999)}`
    }

    /**
     * show, shows the 
     * @param modal 
     */

    /**
     * on Modal show event
     */
    private _onModalShow(modal: any){
        let eventCallback: any = this.registeredEvents.onModalOpen || null;
        if(typeof eventCallback == 'function'){
            eventCallback(modal)
        }
    }

    /**
     * on modal close  event
     * @param any 
     */
    private _onModalClose(modal: any){
        let eventCallback: any = this.registeredEvents.onModalClose || null;
        if(typeof eventCallback == 'function'){
            eventCallback(modal)
        }
    }

    /**
     * events
     * @param eventName 
     */
    on(eventName: string, callback: Function = ()=>{}){
        if(!this.eventNames.includes(eventName)){
            throw new Error(`Unknown Event ${eventName}`)
        }

        (this.registeredEvents as any).eventName = callback;
    }


    /**
     * modalMarkup
     */
    private _getModalMarkup(modalId: string){

        let modalMarkup = `
            <div class="wallet-provider-modal">
                <div id="${modalId}" aria-hidden="true">
                    <div tabindex="-1" data-micromodal-close>
                        <div role="dialog" aria-modal="true" aria-labelledby="${modalId}-title" >
                            <header>
                                <h2 id="${modalId}-title">
                                    ${this.config.modalTitle}
                                </h2>
                                <button aria-label="Close modal" data-micromodal-close></button>
                            </header>
                            
                            <div id="${modalId}-content">
                                Modal Content
                            </div>
                
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    //inject css 
    private inJectCss(){
        var style = document.createElement('style');
        style.setAttribute("id","wallet_provider__style")
        style.innerHTML = `
            .wallet-provider-modal .modal {
                display: none;
            }
            
            .wallet-provider-modal .modal.is-open {
                display: block;
            }     
        `;
        document.head.appendChild(style);
    } //end fun

    connect(){

    }

 }

 export default WalletProviderCore;
 module.exports = WalletProviderCore;