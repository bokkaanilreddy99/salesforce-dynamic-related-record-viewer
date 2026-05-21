import { LightningElement ,api ,track} from 'lwc';
import getRelatedRecord from '@salesforce/apex/RelatedRecordViewer.getRelatedRecord';

export default class DynamicRelatedRecords extends LightningElement {

    @api recordId;
    @api limitSize = 5;
    @track data = [];
    error = '';

    @api childObjectApiName ='Opportunity';
    @api fieldsList ='Id, Name, StageName, CloseDate';
    @api lookupFieldApiName = 'AccountId';

    connectedCallback(){
        this.loadchildRecords();
    }

    async loadchildRecords(){
        try{
            const result = await getRelatedRecord({
            recordId : this.recordId,
            childObjectApiName :this.childObjectApiName,
            fieldsList :this.fieldsList,
            lookupFieldApiName : this.lookupFieldApiName,
            limitSize  : this.limitSize
            });
            console.log('data is : ' +  JSON.stringify(result));
            this.data = result;

        }
        catch(e){
            this.data = [];
            this.error = e.body.message;
        }
       
    }

    get columns(){
        const fields = this.fieldsList.split(',').map(f => f.trim()).filter(Boolean);
        return fields.map(field =>({ label: field , fieldName: field}));
    }

}