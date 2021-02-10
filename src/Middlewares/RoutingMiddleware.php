<?php

namespace App\Middlewares;

use App\Services\TemplateEngine\Twig\Twig;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use App\Services\Dispatching\DispatcherHelper\RoutingInformationHandler;
use App\Services\Dispatching\Dispatcher;
use FastRoute;

class RoutingMiddleware implements MiddlewareInterface
{
    // KEYS
    const VERIFICATION_URL_KEY = "verification_url";

    const DOMAIN = "https://form.gasparyan.am";
    const VERIFICATION_URL = self::DOMAIN . "/email_verification";

	/**
	 * @var MiddlewareInterface|null
	 */
	private $next = null;

	public function process(Request $request): Response
	{
		$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
		    // Handle Form Rendering.
            $r->addRoute(Request::METHOD_GET, "/form", ["Form", "get"]);

            // Handle Form Submission.
            $r->addRoute(Request::METHOD_POST, "/form", ["Form", "submit"]);

            // ------------------------------- SYMPTOMS ------------------------------------------------ //

            // Handle Requests to Symptoms
            $r->addRoute(Request::METHOD_GET, "/symptoms", ["Symptom", "getCollection"]);

            // Handle Request to Headaches
            $r->addRoute(Request::METHOD_GET, "/symptoms/headaches", ["Symptom", "getHeadaches"]);

            // ------------------------------- END OF SYMPTOMS ----------------------------------------- //

            // Handle Request to Thank You Page
            $r->addRoute(Request::METHOD_GET, "/thank-you", ["ThankYou", "get"]);

            // Handle Request for Email Validation
            $r->addRoute(Request::METHOD_GET, "/email_verification/{validation_hash}", ["EmailVerification", "verify"]);

            // Handle POST Request for Email Verification
            $r->addRoute(Request::METHOD_POST, "/email_verification", ["EmailVerification", "verifyPost"]);

            // Handle Request for Contact Plain Message
            $r->addRoute(Request::METHOD_POST, "/message", ["Contact", "plainMessage"]);
        });

		$httpMethod = $request->getMethod();
		$uri = $request->getBaseUrl().$request->getPathInfo();
		$routeInfo = $dispatcher->dispatch($httpMethod, $uri);

		switch ($routeInfo[0]) {
		    case FastRoute\Dispatcher::NOT_FOUND:
		        return Response::create((new Twig())->render("/pages/not_found.html.twig", ["not_home" => true]));
		        break;
		    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
		        $allowedMethods = $routeInfo[1];
		        // ... 405 Method Not Allowed
		        break;
		    case FastRoute\Dispatcher::FOUND:
				// dispatcher hadnling preparation						        
		        $handler = $routeInfo[1];
		        $placeholders = $routeInfo[2];
		        $routingInformationHandler = new RoutingInformationHandler($handler, $placeholders);
		        
		        $dispatcher = new Dispatcher();
		        return $dispatcher->dispatch($request, $routingInformationHandler);
		        break;
		}
	}

	public function setNext(MiddlewareInterface $middelware): void
	{
		$this->next = $middelware;
	}
}
