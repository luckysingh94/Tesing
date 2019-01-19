<?php

namespace Tests\Unit;

use App\FormLogin;

use Illuminate\Http\Request;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->json('POST','/_lf');
        $response->assertStatus(200);

    }

    public function testLoginForm()
    {
        $form = FormLogin::whereId(1)->first();
        $response = $this->actingAs($form,'api')->json('GET','/loginform');
        $response->assertStatus(200);
    }
}
