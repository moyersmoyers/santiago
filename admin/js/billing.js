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
