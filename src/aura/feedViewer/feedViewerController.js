({
    // Handle component initialization
    doInit : function(component, event, helper) {
      //attributes
        var type = component.get("v.type");
        var types = component.get("v.types");
      //selectors
        var typeOpts = new Array();
        var showAsOpts = new Array();


        // Set the feed types on the ui:inputSelect component
        for (var i = 0; i < types.length; i++) {
            typeOpts.push({label: types[i], value: types[i], selected: types[i] === type});
        }

        component.find("typeSelect").set("v.options", typeOpts);
        args = {type:type,showAs:'me'};
        helper.createFeed(component,args);

        var getRecords = component.get("c.getRecords");


        //async
        getRecords.setCallback(this, function(action) {
           console.log("in callback" + action.getReturnValue());
           if (action.getState() === "SUCCESS") {
               console.log(action.getReturnValue());
               var opts = {};
               opts.records = action.getReturnValue();
               opts.label='Name';
               opts.value='Id';
               showAsOpts=helper.createPicklist(component,opts);
               component.find("showAs").set("v.options", showAsOpts);

           } else {
               alert(action.getState());
           }
       });
       $A.enqueueAction(getRecords);
    },

  onChangeType : function(component, event, helper) {
        var args = {};
        var typeSelect = component.find("typeSelect");
        args.type = typeSelect.get("v.value");

        if(args.type=="Record")
        {
          component.set("v.isRecord",true);
          args.showAs = cmp.find("showAs").get("v.value");
        }
        else
        {
          component.set("v.objectSelected",false);
          component.set("v.isRecord",false);
          args.showAs="me";
        }



       // Dynamically create the feed with the specified type
      helper.createFeed(component,args);

    },
    onChangeUser: function(cmp, e, h){
      var args = {};
      args.type = cmp.find("typeSelect").get("v.value");
      args.showAs = cmp.find("showAs").get("v.value");
      console.log('userchanged');
      h.createFeed(cmp,args);
    },
    updateTriggerLabel: function(cmp, event) {
        var triggerCmp = cmp.find("trigger");
        if (triggerCmp) {
            var source = event.getSource();
            var label = source.get("v.label");
            triggerCmp.set("v.label", label);
            cmp.set("v.Object",label);
            cmp.set("v.objectSelected",true);
        }
    },
    updateLabel: function(cmp, event) {
        var triggerCmp = cmp.find("mytrigger");
        if (triggerCmp) {
            var source = event.getSource();
            var label = source.get("v.label");
            triggerCmp.set("v.label", label);
        }
    },
    getMenuSelected: function(cmp, event) {
        var menuCmp = cmp.find("checkboxMenu");
        var menuItems = menuCmp.get("v.childMenuItems");
        var values = [];
        for (var i = 0; i < menuItems.length; i++) {
            var c = menuItems[i];
            if (c.get("v.selected") === true) {
                values.push(c.get("v.label"));
            }
        }
        var resultCmp = cmp.find("result");
        resultCmp.set("v.value", values.join(","));
    },
    getRadioMenuSelected: function(cmp, event) {
        var menuCmp = cmp.find("radioMenu");
        var menuItems = menuCmp.get("v.childMenuItems");
        var values = [];
        for (var i = 0; i < menuItems.length; i++) {
            var c = menuItems[i];
            if (c.get("v.selected") === true) {
                values.push(c.get("v.label"));
            }
        }
        var resultCmp = cmp.find("radioResult");
        resultCmp.set("v.value", values.join(","));
    }


})
