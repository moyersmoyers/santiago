$('#requests-table').dataTable({
	scrollX: true,
	columnDefs: [
		{
			targets: -1,
			className: 'dt-center'
		},
		{
			targets: 0,
			className: 'dt-right'
		}
	]
});

/*$(function (){
	$('[tooltip="true"]').tooltip();
});*/

/*const tooltipTriggerList = document.querySelectorAll('[tooltip="true"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));*/