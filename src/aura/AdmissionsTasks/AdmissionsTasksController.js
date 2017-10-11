({
    getTasks : function( component, event, helper ){
        var action = component.get("c.getTasksWithLeadInfo");
        var loadingSpinner = component.find('loading');
        $A.util.removeClass(loadingSpinner, 'slds-hide');    
        var tasksTarget = component.find('tasks-container');
        $A.util.addClass(tasksTarget, 'slds-hide');    

        action.setParams({ 
            subject: component.get("v.segment")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.tasks", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
            $A.util.addClass(loadingSpinner, 'slds-hide');    
            $A.util.removeClass(tasksTarget, 'slds-hide');    
        })

        $A.enqueueAction(action);
    }
})