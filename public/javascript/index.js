$(document).ready(function () {
    const table = $('#table').DataTable({
        serverSide: true,
        processing: true,
        searchDelay: 1000,
        paging: true,
        ajax: {
            url: 'api/data',
        },
        // columns must match number of th
        columns: [
            {data: 'id'},
            {data: 'title'},
            {data: 'value'},
            {
                width: '10%',
                data: null,
                defaultContent: '<button class="btn btn-danger delete" style="display: block; margin: auto;">Delete!</button>',
            },
        ],
    });
    $.fn.dataTable.ext.errMode = (settings, helpPage, message) => {
        console.error(message);
    };

    $('#table tbody').on('click', '.delete', function () {
        const row = $(this).closest('tr');
        const idToDelete = table.row(row).data().id;
        $.ajax({
            url: 'api/data/' + idToDelete,
            type: 'DELETE',
            success: () => {
                console.log('Deleted row with id: ', idToDelete);
                table.row(row).remove().draw();
            },
            error: (err) => {
                console.error(err);
            }
        })
    });
});
