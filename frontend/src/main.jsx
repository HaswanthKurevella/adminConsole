import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import ErrorPage from './error-page.jsx';
import FbReceived from './feedbackRecieved.jsx';
// Routes
import TherapistReg from './therapistReg.jsx';
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'therapistReg',
				element: <TherapistReg/>,
			},
			{
				path: 'fbrecieved',
				element: <FbReceived/>,
			},
			
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
