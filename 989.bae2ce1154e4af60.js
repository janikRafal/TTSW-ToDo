"use strict";(self.webpackChunkToDoApp=self.webpackChunkToDoApp||[]).push([[989],{9773:(T,f,l)=>{l.d(f,{R:()=>a});var i=l(9360),d=l(8251),s=l(4829),e=l(2420);function a(v){return(0,i.e)((O,r)=>{(0,s.Xf)(v).subscribe((0,d.x)(r,()=>r.complete(),e.Z)),!r.closed&&O.subscribe(r)})}},3259:(T,f,l)=>{l.d(f,{u:()=>O,z:()=>r});var i=l(1180),d=l(6814),s=l(4946),e=l(2076),a=l(2332),v=l(5219);let O=(()=>{class h{get disabled(){return this._disabled}set disabled(t){this._disabled=t,this.deactivate()}constructor(t,o,n,p,g,c){(0,i.Z)(this,"platformId",void 0),(0,i.Z)(this,"el",void 0),(0,i.Z)(this,"zone",void 0),(0,i.Z)(this,"config",void 0),(0,i.Z)(this,"renderer",void 0),(0,i.Z)(this,"changeDetector",void 0),(0,i.Z)(this,"tooltipPosition",void 0),(0,i.Z)(this,"tooltipEvent","hover"),(0,i.Z)(this,"appendTo",void 0),(0,i.Z)(this,"positionStyle",void 0),(0,i.Z)(this,"tooltipStyleClass",void 0),(0,i.Z)(this,"tooltipZIndex",void 0),(0,i.Z)(this,"escape",!0),(0,i.Z)(this,"showDelay",void 0),(0,i.Z)(this,"hideDelay",void 0),(0,i.Z)(this,"life",void 0),(0,i.Z)(this,"positionTop",void 0),(0,i.Z)(this,"positionLeft",void 0),(0,i.Z)(this,"autoHide",!0),(0,i.Z)(this,"fitContent",!0),(0,i.Z)(this,"hideOnEscape",!0),(0,i.Z)(this,"text",void 0),(0,i.Z)(this,"tooltipOptions",void 0),(0,i.Z)(this,"_tooltipOptions",{tooltipLabel:null,tooltipPosition:"right",tooltipEvent:"hover",appendTo:"body",positionStyle:null,tooltipStyleClass:null,tooltipZIndex:"auto",escape:!0,disabled:null,showDelay:null,hideDelay:null,positionTop:null,positionLeft:null,life:null,autoHide:!0,hideOnEscape:!0}),(0,i.Z)(this,"_disabled",void 0),(0,i.Z)(this,"container",void 0),(0,i.Z)(this,"styleClass",void 0),(0,i.Z)(this,"tooltipText",void 0),(0,i.Z)(this,"showTimeout",void 0),(0,i.Z)(this,"hideTimeout",void 0),(0,i.Z)(this,"active",void 0),(0,i.Z)(this,"mouseEnterListener",void 0),(0,i.Z)(this,"mouseLeaveListener",void 0),(0,i.Z)(this,"containerMouseleaveListener",void 0),(0,i.Z)(this,"clickListener",void 0),(0,i.Z)(this,"focusListener",void 0),(0,i.Z)(this,"blurListener",void 0),(0,i.Z)(this,"scrollHandler",void 0),(0,i.Z)(this,"resizeListener",void 0),this.platformId=t,this.el=o,this.zone=n,this.config=p,this.renderer=g,this.changeDetector=c}ngAfterViewInit(){(0,d.NF)(this.platformId)&&this.zone.runOutsideAngular(()=>{if("hover"===this.getOption("tooltipEvent"))this.mouseEnterListener=this.onMouseEnter.bind(this),this.mouseLeaveListener=this.onMouseLeave.bind(this),this.clickListener=this.onInputClick.bind(this),this.el.nativeElement.addEventListener("mouseenter",this.mouseEnterListener),this.el.nativeElement.addEventListener("click",this.clickListener),this.el.nativeElement.addEventListener("mouseleave",this.mouseLeaveListener);else if("focus"===this.getOption("tooltipEvent")){this.focusListener=this.onFocus.bind(this),this.blurListener=this.onBlur.bind(this);let t=this.getTarget(this.el.nativeElement);t.addEventListener("focus",this.focusListener),t.addEventListener("blur",this.blurListener)}})}ngOnChanges(t){t.tooltipPosition&&this.setOption({tooltipPosition:t.tooltipPosition.currentValue}),t.tooltipEvent&&this.setOption({tooltipEvent:t.tooltipEvent.currentValue}),t.appendTo&&this.setOption({appendTo:t.appendTo.currentValue}),t.positionStyle&&this.setOption({positionStyle:t.positionStyle.currentValue}),t.tooltipStyleClass&&this.setOption({tooltipStyleClass:t.tooltipStyleClass.currentValue}),t.tooltipZIndex&&this.setOption({tooltipZIndex:t.tooltipZIndex.currentValue}),t.escape&&this.setOption({escape:t.escape.currentValue}),t.showDelay&&this.setOption({showDelay:t.showDelay.currentValue}),t.hideDelay&&this.setOption({hideDelay:t.hideDelay.currentValue}),t.life&&this.setOption({life:t.life.currentValue}),t.positionTop&&this.setOption({positionTop:t.positionTop.currentValue}),t.positionLeft&&this.setOption({positionLeft:t.positionLeft.currentValue}),t.disabled&&this.setOption({disabled:t.disabled.currentValue}),t.text&&(this.setOption({tooltipLabel:t.text.currentValue}),this.active&&(t.text.currentValue?this.container&&this.container.offsetParent?(this.updateText(),this.align()):this.show():this.hide())),t.autoHide&&this.setOption({autoHide:t.autoHide.currentValue}),t.tooltipOptions&&(this._tooltipOptions={...this._tooltipOptions,...t.tooltipOptions.currentValue},this.deactivate(),this.active&&(this.getOption("tooltipLabel")?this.container&&this.container.offsetParent?(this.updateText(),this.align()):this.show():this.hide()))}isAutoHide(){return this.getOption("autoHide")}onMouseEnter(t){!this.container&&!this.showTimeout&&this.activate()}onMouseLeave(t){(this.isAutoHide()||!(e.p.hasClass(t.target,"p-tooltip")||e.p.hasClass(t.target,"p-tooltip-arrow")||e.p.hasClass(t.target,"p-tooltip-text")||e.p.hasClass(t.relatedTarget,"p-tooltip")))&&this.deactivate()}onFocus(t){this.activate()}onBlur(t){this.deactivate()}onInputClick(t){this.deactivate()}onPressEscape(){this.hideOnEscape&&this.deactivate()}activate(){if(this.active=!0,this.clearHideTimeout(),this.getOption("showDelay")?this.showTimeout=setTimeout(()=>{this.show()},this.getOption("showDelay")):this.show(),this.getOption("life")){let t=this.getOption("showDelay")?this.getOption("life")+this.getOption("showDelay"):this.getOption("life");this.hideTimeout=setTimeout(()=>{this.hide()},t)}}deactivate(){this.active=!1,this.clearShowTimeout(),this.getOption("hideDelay")?(this.clearHideTimeout(),this.hideTimeout=setTimeout(()=>{this.hide()},this.getOption("hideDelay"))):this.hide()}create(){this.container&&(this.clearHideTimeout(),this.remove()),this.container=document.createElement("div");let t=document.createElement("div");t.className="p-tooltip-arrow",this.container.appendChild(t),this.tooltipText=document.createElement("div"),this.tooltipText.className="p-tooltip-text",this.updateText(),this.getOption("positionStyle")&&(this.container.style.position=this.getOption("positionStyle")),this.container.appendChild(this.tooltipText),"body"===this.getOption("appendTo")?document.body.appendChild(this.container):"target"===this.getOption("appendTo")?e.p.appendChild(this.container,this.el.nativeElement):e.p.appendChild(this.container,this.getOption("appendTo")),this.container.style.display="inline-block",this.fitContent&&(this.container.style.width="fit-content"),this.isAutoHide()||this.bindContainerMouseleaveListener()}bindContainerMouseleaveListener(){this.containerMouseleaveListener||(this.containerMouseleaveListener=this.renderer.listen(this.container??this.container.nativeElement,"mouseleave",o=>{this.deactivate()}))}unbindContainerMouseleaveListener(){this.containerMouseleaveListener&&(this.bindContainerMouseleaveListener(),this.containerMouseleaveListener=null)}show(){!this.getOption("tooltipLabel")||this.getOption("disabled")||(this.create(),this.align(),e.p.fadeIn(this.container,250),"auto"===this.getOption("tooltipZIndex")?a.P9.set("tooltip",this.container,this.config.zIndex.tooltip):this.container.style.zIndex=this.getOption("tooltipZIndex"),this.bindDocumentResizeListener(),this.bindScrollListener())}hide(){"auto"===this.getOption("tooltipZIndex")&&a.P9.clear(this.container),this.remove()}updateText(){this.getOption("escape")?(this.tooltipText.innerHTML="",this.tooltipText.appendChild(document.createTextNode(this.getOption("tooltipLabel")))):this.tooltipText.innerHTML=this.getOption("tooltipLabel")}align(){switch(this.getOption("tooltipPosition")){case"top":this.alignTop(),this.isOutOfBounds()&&(this.alignBottom(),this.isOutOfBounds()&&(this.alignRight(),this.isOutOfBounds()&&this.alignLeft()));break;case"bottom":this.alignBottom(),this.isOutOfBounds()&&(this.alignTop(),this.isOutOfBounds()&&(this.alignRight(),this.isOutOfBounds()&&this.alignLeft()));break;case"left":this.alignLeft(),this.isOutOfBounds()&&(this.alignRight(),this.isOutOfBounds()&&(this.alignTop(),this.isOutOfBounds()&&this.alignBottom()));break;case"right":this.alignRight(),this.isOutOfBounds()&&(this.alignLeft(),this.isOutOfBounds()&&(this.alignTop(),this.isOutOfBounds()&&this.alignBottom()))}}getHostOffset(){if("body"===this.getOption("appendTo")||"target"===this.getOption("appendTo")){let t=this.el.nativeElement.getBoundingClientRect();return{left:t.left+e.p.getWindowScrollLeft(),top:t.top+e.p.getWindowScrollTop()}}return{left:0,top:0}}alignRight(){this.preAlign("right");let t=this.getHostOffset(),o=t.left+e.p.getOuterWidth(this.el.nativeElement),n=t.top+(e.p.getOuterHeight(this.el.nativeElement)-e.p.getOuterHeight(this.container))/2;this.container.style.left=o+this.getOption("positionLeft")+"px",this.container.style.top=n+this.getOption("positionTop")+"px"}alignLeft(){this.preAlign("left");let t=this.getHostOffset(),o=t.left-e.p.getOuterWidth(this.container),n=t.top+(e.p.getOuterHeight(this.el.nativeElement)-e.p.getOuterHeight(this.container))/2;this.container.style.left=o+this.getOption("positionLeft")+"px",this.container.style.top=n+this.getOption("positionTop")+"px"}alignTop(){this.preAlign("top");let t=this.getHostOffset(),o=t.left+(e.p.getOuterWidth(this.el.nativeElement)-e.p.getOuterWidth(this.container))/2,n=t.top-e.p.getOuterHeight(this.container);this.container.style.left=o+this.getOption("positionLeft")+"px",this.container.style.top=n+this.getOption("positionTop")+"px"}alignBottom(){this.preAlign("bottom");let t=this.getHostOffset(),o=t.left+(e.p.getOuterWidth(this.el.nativeElement)-e.p.getOuterWidth(this.container))/2,n=t.top+e.p.getOuterHeight(this.el.nativeElement);this.container.style.left=o+this.getOption("positionLeft")+"px",this.container.style.top=n+this.getOption("positionTop")+"px"}setOption(t){this._tooltipOptions={...this._tooltipOptions,...t}}getOption(t){return this._tooltipOptions[t]}getTarget(t){return e.p.hasClass(t,"p-inputwrapper")?e.p.findSingle(t,"input"):t}preAlign(t){this.container.style.left="-999px",this.container.style.top="-999px";let o="p-tooltip p-component p-tooltip-"+t;this.container.className=this.getOption("tooltipStyleClass")?o+" "+this.getOption("tooltipStyleClass"):o}isOutOfBounds(){let t=this.container.getBoundingClientRect(),o=t.top,n=t.left,p=e.p.getOuterWidth(this.container),g=e.p.getOuterHeight(this.container),c=e.p.getViewport();return n+p>c.width||n<0||o<0||o+g>c.height}onWindowResize(t){this.hide()}bindDocumentResizeListener(){this.zone.runOutsideAngular(()=>{this.resizeListener=this.onWindowResize.bind(this),window.addEventListener("resize",this.resizeListener)})}unbindDocumentResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new e.V(this.el.nativeElement,()=>{this.container&&this.hide()})),this.scrollHandler.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}unbindEvents(){if("hover"===this.getOption("tooltipEvent"))this.el.nativeElement.removeEventListener("mouseenter",this.mouseEnterListener),this.el.nativeElement.removeEventListener("mouseleave",this.mouseLeaveListener),this.el.nativeElement.removeEventListener("click",this.clickListener);else if("focus"===this.getOption("tooltipEvent")){let t=this.getTarget(this.el.nativeElement);t.removeEventListener("focus",this.focusListener),t.removeEventListener("blur",this.blurListener)}this.unbindDocumentResizeListener()}remove(){this.container&&this.container.parentElement&&("body"===this.getOption("appendTo")?document.body.removeChild(this.container):"target"===this.getOption("appendTo")?this.el.nativeElement.removeChild(this.container):e.p.removeChild(this.container,this.getOption("appendTo"))),this.unbindDocumentResizeListener(),this.unbindScrollListener(),this.unbindContainerMouseleaveListener(),this.clearTimeouts(),this.container=null,this.scrollHandler=null}clearShowTimeout(){this.showTimeout&&(clearTimeout(this.showTimeout),this.showTimeout=null)}clearHideTimeout(){this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null)}clearTimeouts(){this.clearShowTimeout(),this.clearHideTimeout()}ngOnDestroy(){this.unbindEvents(),this.container&&a.P9.clear(this.container),this.remove(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null)}}return(0,i.Z)(h,"\u0275fac",function(t){return new(t||h)(s.Y36(s.Lbi),s.Y36(s.SBq),s.Y36(s.R0b),s.Y36(v.b4),s.Y36(s.Qsj),s.Y36(s.sBO))}),(0,i.Z)(h,"\u0275dir",s.lG2({type:h,selectors:[["","pTooltip",""]],hostAttrs:[1,"p-element"],hostBindings:function(t,o){1&t&&s.NdJ("keydown.escape",function(p){return o.onPressEscape(p)},!1,s.evT)},inputs:{tooltipPosition:"tooltipPosition",tooltipEvent:"tooltipEvent",appendTo:"appendTo",positionStyle:"positionStyle",tooltipStyleClass:"tooltipStyleClass",tooltipZIndex:"tooltipZIndex",escape:"escape",showDelay:"showDelay",hideDelay:"hideDelay",life:"life",positionTop:"positionTop",positionLeft:"positionLeft",autoHide:"autoHide",fitContent:"fitContent",hideOnEscape:"hideOnEscape",text:["pTooltip","text"],disabled:["tooltipDisabled","disabled"],tooltipOptions:"tooltipOptions"},features:[s.TTD]})),h})(),r=(()=>{class h{}return(0,i.Z)(h,"\u0275fac",function(t){return new(t||h)}),(0,i.Z)(h,"\u0275mod",s.oAB({type:h})),(0,i.Z)(h,"\u0275inj",s.cJS({imports:[d.ez]})),h})()}}]);