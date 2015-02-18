public with sharing class feedViewer {

	public feedViewer() {

	}
	@AuraEnabled
	public static List<sObject> getRecords() {
		String query = 'SELECT Id,Name FROM '+ 'User';
		List<sObject> sos = database.query(query);
		return sos;

	}
}