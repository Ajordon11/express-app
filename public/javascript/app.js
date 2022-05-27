$(function() {
    console.log( "ready!" );
    $('#input').on('change', (e) => {
        const filterValue = e.target.value;
        console.log(filterValue);
        $.ajax({
            url: '/filter',
            type: 'GET',
            data: `input=${filterValue}`,
            dataType: 'json',
            success: (res) => {
                console.log('Response: ', res);
            },
            error: (err) => {
                console.error('Error: ', err);
            }
        })
    })
});
