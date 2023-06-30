async function createInvoice(index) {
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer sk_test_51KEUM8DPXgBbv1P47Ai1sXLETbFSemYGoaLRaUpPgnDTryfrYOuOjzUTidI5eqSAdlt8wy4E44nQhYw1249Y8CtG00NzQL9Ilh");
    myHeaders.append("x-temi-organization-id", "578055b3ca95cc067ab9b6ee73c8950a");
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    let invoiceId = null
    await fetch("https://api.stripe.com/v1/invoiceitems?customer=cus_M7ceDmYEULysjh&price=price_1L3dbVDPXgBbv1P4efrROBeg", requestOptions)
        .then(() => console.log(index, 'a'))
        // .then(response => response.text())
        // .then(result => console.log(result))
        .catch(error => console.log('error', error));

    
    await fetch("https://api.stripe.com/v1/invoices?customer=cus_M7ceDmYEULysjh&auto_advance=true&discounts[0][coupon]=KH2rolsD&collection_method=charge_automatically&default_payment_method=pm_1LPNRlDPXgBbv1P43VQTSF5r&auto_advance", requestOptions)
        .then(response => response.json())
        .then(result => invoiceId = result.id)
        .then(() => console.log(index, 'b'))
        .catch(error => console.log('error', error));
    
    if (index < 150) {
        createInvoice(index + 1)
    }

    fetch(`https://api.stripe.com/v1/invoices/${invoiceId}/pay`, requestOptions)
        // .then(response => response.text())
        // .then(result => console.log(result))
        .then(() => console.log(index, 'c'))
        .catch(error => console.log('error', error));
}
createInvoice(0)
// for (let index = 0; index < 50; index++) {
//     createInvoice(index)
// }




