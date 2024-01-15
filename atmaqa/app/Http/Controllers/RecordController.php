<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Google;

class RecordController extends Controller
{
    //laravel passport doesnt work well with apiclient v2.12.1
    public function getAccessToken()
    {
        $jsonKey = [
            'type' => 'service_account',
            "project_id" => "bold-shade-379007",
            "private_key_id" => "dc97e58046ec0f91d5e659a246b54b5f830fcc6e",
            "private_key" => "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCti+Xeb36WaJCw\nzg61Y2nnbpMh4oj3PEOO1hyujYnY2LpfT31xti/X5yD9tcQEbqoeFd8IHdy44RWF\nz185WyKzGqDdnTe93K6hT61UxuZ7uj050uKMPe40Z5oMLE6yvcQNTYoz2HNBXWsp\nHnfEBDvqqnI21kCs1fiUi0jUA9efVYGOFx9D/YxL4CK/kl8voBemyaqe/xH/qrvw\nsrRe6sZ2a4iYzWvAA2a07EM/Gs5xXqN4fYBJ+evSLlDBQbtu5h04o4twDpgkaBzZ\nMPQiYzKngqiUOtrJGUPFjb8JGoAb5FLZpCNG1BW7RKUmtrmjJYWBN9QEUCUrQpg5\nM3bfbn/xAgMBAAECggEAAVQ3VjFRYbVjjeZT397m4k3FVMJTBelLdSVsU84MfGof\nAW0F/2Xgt3XEgn/GD//mOGsIL4TFkZ1qL7uiqefp5JyWRcZc2DtQ/E1XNyPvsaGu\nJ4duTMkV5WRiQTPh1vGQzS9HDVZQOFxr6eJJhvThhpR4BJ58Cgg+WMGWTDsn2Mdc\n/y0d7FREv4/ltu/0QxknF7OG+cY0SDm2cMM+nXzPKT8ERLZpudO4xlIdINACtQuL\n26Tp46j+PNDA0HluDRgeJI7qgw2acG1qcup2JGslQqZiIIwR/Jc/hpgDMn4ghflA\nrBHxlHran86UyP/CLYE4vvzhxZ0MemK/d5JraRwd9wKBgQDyiVg8LG6tIxZmUaQR\ni/90KVGBxCkLw45wvu2TSZgtD3NpMl2+VmNeRFmn9BA61d8lQeiAto6h5rwIgMqm\n7RnIrLpfOeQ0F7DgW2nsm4FiKalOh903rDQOqgYJSrPTFi2InCkS3x85CCYuY6N1\nruH7RJC64qez7oZ8VFHL2Kj2twKBgQC3LiUQln+BjMM96qIsdL3rGCdVqMccKJce\npJZDMBhTZc/dIfegfccMzN1ctFowM9eC5HTqIyQ0ke3GnfeE7NUutZ28Kvo2rn20\nYX1QTOKsfq4VebpFuqC/llQWf2CplfRSV2naU8bZEfBeceyR7zzB8INf6+8dJpew\nVPm+jrjWlwKBgQCPGdJhzqWOqkExJcJ0R/H1i9t3gVHmiv+kLkLmwGl1TMR/sSP2\nheojWJi9rBdXX5FF3llceFo31HflXHg1fXfVG3TrcrDeu4u1FLquzCHO1V3749X2\nXzhn3pGpMdZgGZnMHLdvVw6JC/HbNRbg/MqBAreSTOE+HOJkwStx5ufqiQKBgCVf\nccp3mh4ZVQA97cZ6LwFXFTdhzvXMxkBHPi0JE/136TfppTcGUmUnKwat+TSabx7S\nc5QNhWaAW23JbuWc2EXGYh8w+YnMgfMabNHETf75fZT+F+YAFKniBtfsNxGCea2P\nDhawPwKsqUjrn2OK1u+OnY8leMyOwiYEwEuDnOyTAoGAfSbBAvtc5Eh5/u2Mv4Fb\nuJmnXZhNfBg4Y5sqP3Eb6vh3/wIPOu4guQ57K+NN5knxHTATemo7v+vaeN/wPHDb\nlH/YEcqnJ/o7OTMVhCVaGnFeQ2smoN5WKcuWKzK0XyzlEhAWIIUdZdfDAM6gEmhz\nNXd34CV3yrygYPmxNHD8r3k=\n-----END PRIVATE KEY-----\n",
            "client_email" => "speech-to-text-pandu@bold-shade-379007.iam.gserviceaccount.com",
            "client_id" => "106449835385209387370",
            "auth_uri" => "https://accounts.google.com/o/oauth2/auth",
            "token_uri" => "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url" => "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url" => "https://www.googleapis.com/robot/v1/metadata/x509/speech-to-text-pandu%40bold-shade-379007.iam.gserviceaccount.com"
        ];
        $client = new Google\Client();
        $client->setAuthConfig($jsonKey);
        $client->addScope('https://www.googleapis.com/auth/cloud-platform');
        $client->setApplicationName('meeting-ta');

        // return response()->json(['access_token' => $client->getAccessToken()]);
        $client->fetchAccessTokenWithAssertion();
        return response()->json(['status' => 'success', 'access_token' => $client->getAccessToken()['access_token']]);
    }
}
