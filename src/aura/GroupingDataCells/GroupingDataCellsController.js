({
	doInit : function(component, event, helper) {
		var factMap = component.get("v.factMap");
		if( factMap ){
			var groupingKey = component.get("v.groupingKey");
			component.set("v.dataRows", factMap[groupingKey+"!T"].rows)
		}
	},
	editRecord : function (component, event, helper) {
		var recordId = event.currentTarget.dataset.recordid;
		var editRecordEvent = $A.get("e.force:editRecord");
		editRecordEvent.setParams({
			 "recordId": recordId
		});
		editRecordEvent.fire();
	}
})