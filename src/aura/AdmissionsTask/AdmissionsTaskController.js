({
    setIsOverdue : function(component, event, helper){
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        var today = [year, month, day].join('-');
        var taskWithLeadInfo = component.get("v.taskWithLeadInfo");

        var isOverdue = taskWithLeadInfo.taskInfo.ActivityDate != null
            && taskWithLeadInfo.taskInfo.ActivityDate < [year, month, day].join('-');
        component.set("v.isOverdue", isOverdue);
    },

    goToTask : function (component, event, helper) {
        var taskWithLeadInfo = component.get("v.taskWithLeadInfo");
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
             "recordId": taskWithLeadInfo.taskInfo.Id
        });
        editRecordEvent.fire();
    },
    goToLead : function (component, event, helper) {
        var taskWithLeadInfo = component.get("v.taskWithLeadInfo");
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
             "recordId": taskWithLeadInfo.leadInfo.Id
        });
        editRecordEvent.fire();
    }
})