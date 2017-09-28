const listDespatchedOrders = (z, bundle) => {
  // `z.console.log()` is similar to `console.log()`.
      z.console.log('console says hello world!');

      // You can build requests and our client will helpfully inject all the variables
      // you need to complete. You can also register middleware to control this.
      const requestOptions = {
          url: 'http://{{bundle.inputData.domain}}/api/despatchedorders/{{bundle.inputData.accountId}}/',
      };

  // You may return a promise or a normal data structure from any perform method.
    return z.request(requestOptions).then((response) => JSON.parse(response.content));
};

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
    key: 'order_despatched',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
    noun: 'Despatched Order',
    display: {
        label: 'Order Despatched',
        description: 'Trigger when an order is despatched.'
    },

  // `operation` is where the business logic goes.
    operation: {
        perform: listDespatchedOrders,

        // `inputFields` can define the fields a user could provide,
        // we'll pass them in as `bundle.inputData` later.
        inputFields: [
            {key: 'domain', type: 'string', required: true, label: 'Domain'},
            {key: 'accountId', type: 'integer', required: true, label: 'Account ID', helpText: 'Your AccountID (from the db)'}
        ],
           
        // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
        // field definitions. The result will be used to augment the sample.
        // outputFields: () => { return []; }
        // Alternatively, a static field definition should be provided, to specify labels for the fields
        outputFields: [
            {key: 'id', label: 'Order ID'},
            {key: 'orderNumber', label: 'Order number'},
            {key: 'dateDespatched', label: 'Date despatched'},
            {key: 'source', label: 'Source'},
            {key: 'price', label: 'Price'},
            {key: 'url', label: 'Url'},
            {key: 'recipientPhone', label: 'Recipient phone'},
            {key: 'recipientEmail', label: 'Recipient email'},
        ],
    
        // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
        // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
        // returned records, and have obviously dummy values that we can show to any user.
        sample: {
            id: 10,
            orderNumber: 1080,
            dateDespatched: '2016-10-24 14:15:24',
            source: 'LexCorp - Ebay',
            price: 15,
            url: 'https://sflite-uat.storefeeder.com/orders/5757657657657',
            recipientPhone: '890890890',
            recipientEmail: 'brian@candykittens.co.uk'
        }
    },
};
