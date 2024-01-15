<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

// Define a base controller class for Laravel controllers
class Controller extends BaseController
{
    // Use the AuthorizesRequests trait, which provides authorization-related methods
    use AuthorizesRequests;

    // Use the DispatchesJobs trait, which provides methods for dispatching jobs
    use DispatchesJobs;

    // Use the ValidatesRequests trait, which provides methods for request data validation
    use ValidatesRequests;
}
