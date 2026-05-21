public with sharing class RelatedRecordViewer {

    @AuraEnabled(cacheable=true)
    public static list<SObject> getRelatedRecord(Id recordId , string childObjectApiName , string fieldsList , string lookupFieldApiName , integer limitSize){

         String soql = 'SELECT ' 
        + fieldsList +
        ' FROM ' + 
        childObjectApiName + 
        ' WHERE ' + 
        lookupFieldApiName + 
        ' = :recordId' + 
        ' LIMIT ' + limitSize;
        

        return Database.query(soql);
    }   
        

}

