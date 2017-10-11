public with sharing class ReportComponentController {
    @AuraEnabled
    public static String getReportMetadata ( Id reportId ){
       return JSON.serialize(Reports.ReportManager.runReport( reportId, true ) );
    }
}