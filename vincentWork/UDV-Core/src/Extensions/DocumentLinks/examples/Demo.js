let baseDemo = new udvcore.BaseDemo({
    iconFolder: '../../../../examples/data/icons',
    imageFolder: '../../../../examples/data/img'
});

baseDemo.appendTo(document.body);

baseDemo.loadConfigFile(
    '../../../../examples/data/config/generalDemoConfig.json').then(() => {

    // Initialize iTowns 3D view
    baseDemo.init3DView();

    ////// REQUEST SERVICE
    const requestService = new udvcore.RequestService();

    ////// AUTHENTICATION MODULE
    const authenticationService =
        new udvcore.AuthenticationService(requestService, baseDemo.config);
    const authenticationView =
        new udvcore.AuthenticationView(authenticationService);
    baseDemo.addModuleView('authentication', authenticationView,
        {type: udvcore.BaseDemo.AUTHENTICATION_MODULE});

    ////// DOCUMENTS MODULE
    const documents = new udvcore.DocumentController(baseDemo.view,
        baseDemo.controls, {temporal: baseDemo.temporal, active: false},
        baseDemo.config, requestService);
    baseDemo.addModuleView('documents', documents);

    ////// CONTRIBUTE EXTENSION
    const contributeController = new udvcore.ContributeController(documents,
        requestService);

    ////// DOCUMENT LINK EXTENSION
    const linkService = new udvcore.LinkService(requestService, baseDemo.config);
    const documentLinkWindow = new udvcore.DocumentLinkWindow(
        linkService, documents, baseDemo.view, baseDemo.controls);
});
