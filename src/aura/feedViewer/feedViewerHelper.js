({
	createFeed : function(component,args) {
		console.log(args);
		$A.componentService.newComponentAsync(
				this,
				function(feed){
						var feedContainer = component.find("feedContainer");
						feedContainer.set("v.body", feed);
				},
				{
						componentDef : "markup://forceChatter:feed",
						attributes : {
								values : {
										type: args.type,
										subjectId: args.showAs
								}
						}
				}
		)
		},
		createPicklist : function(component,args) {
			var opts = new Array();
			var label = args.label;
			var value = args.value;
			for (var i = 0; i < args.records.length; i++) {
				record = args.records[i];

					opts.push({label: record[label], value: record[value], selected: i==0});
			}
			return opts;

	}
})
