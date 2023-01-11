
<!-- Add bootstrap -->
npm install bootstrap
angular.json
	under build options
		under styles
			"node_modules/bootstrap/dist/css/bootstrap.min.css",
ng build

<!-- Add bootstrap icons -->
npm i bootstrap-icons
Then add to your styles.css file
	@import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";