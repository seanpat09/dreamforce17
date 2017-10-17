public with sharing class ReportComponentController {
    @AuraEnabled
    public static String getReportMetadata ( Id reportId ){
       return JSON.serializePretty(Reports.ReportManager.runReport( reportId, true ) );
    }
}