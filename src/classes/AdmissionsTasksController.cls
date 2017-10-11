public with sharing class AdmissionsTasksController {
    @AuraEnabled
    public static List<TaskWithLeadInfo> getTasksWithLeadInfo(String subject){
        String subjectLikeClause = String.escapeSingleQuotes(subject)+'%';
        List<TaskWithLeadInfo> tasksWithLeadInfo = new List<TaskWithLeadInfo>();
        List<Lead> leads = [ 
            SELECT Name, Id, Phone, Email, LeadSource, Company,
                (SELECT Id, Subject, ActivityDate FROM Tasks WHERE IsClosed = false AND Subject LIKE :subjectLikeClause )
            FROM Lead WHERE isConverted = false
            ORDER BY CreatedDate DESC
        ];
        for( Lead l : leads ){
            for( Task t : l.Tasks ){
                tasksWithLeadInfo.add( new TaskWithLeadInfo( t, l ) );
            }
        }
        return tasksWithLeadInfo;
    }

    public class TaskWithLeadInfo{
        @AuraEnabled public Task taskInfo;
        @AuraEnabled public Lead leadInfo;
        public TaskWithLeadInfo( Task t, Lead l ){
            this.taskInfo = t;
            this.leadInfo = l;
        }
    }
}