/* Pure session state. No cookies, persistence, scores, or data transmission. */
(function(root){
'use strict';
function validField(field,value){
 if(field.type==='choice')return field.options.includes(value);
 return typeof value==='string'&&value.trim().length>0&&value.trim().length<=2000;
}
class RepairFlow{
 constructor(data){this.data=data;this.states=data.map(()=>({notice:false,reveal:false,repair:false,answers:{},reflection:{},action:'',plan:''}));}
 available(index){return Number.isInteger(index)&&index>=0&&index<this.data.length&&(index===0||this.states[index-1].repair);}
 stageAvailable(index,stage){if(!this.available(index))return false;return stage==='notice'||stage==='reveal'&&this.states[index].notice||stage==='repair'&&this.states[index].reveal;}
 submitNotice(index,answers){if(!this.available(index))return false;const item=this.data[index];if(!item.fields.every(field=>validField(field,answers[field.id])))return false;const clean=Object.fromEntries(item.fields.map(f=>[f.id,String(answers[f.id]).trim()]));this.states[index].answers=clean;this.states[index].notice=true;return true;}
 submitReveal(index,value){if(!this.stageAvailable(index,'reveal')||!validField(this.data[index].reflect,value))return false;this.states[index].reflection={[this.data[index].reflect.id]:value.trim()};this.states[index].reveal=true;return true;}
 submitRepair(index,action,plan=''){if(!this.stageAvailable(index,'repair')||!this.data[index].actions.includes(action))return false;const field=this.data[index].plan;if(field&&!validField(field,plan))return false;Object.assign(this.states[index],{action,plan:String(plan).trim(),repair:true});return true;}
 get completed(){return this.states.filter(s=>s.repair).length;}
 get finished(){return this.completed===this.data.length;}
}
const exported={RepairFlow,validField};if(typeof module!=='undefined'&&module.exports)module.exports=exported;else root.REPAIR_FLOW=exported;
})(globalThis);
