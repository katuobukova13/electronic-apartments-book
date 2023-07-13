<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\UserService;
use Exception;
use Illuminate\Console\Command;

class CreateUserToken extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = "create:user_token
                            {user-id : User's id}
                            {token-name : Token name}
                            {abilities* : Token abilities}";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Create token by name user's id";

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function handle(UserService $userService): int
    {
        $abilities = $this->argument('abilities');

        try {
            $user = User::findOrFail($this->argument('user-id'));

            $token = $userService->createToken($user, [
                'name' => $this->argument('token-name'),
                'abilities' => $abilities
            ]);
        } catch (Exception $e) {
            $this->error($e->getMessage());

            return Command::FAILURE;
        }

        dump($token);

        return Command::SUCCESS;
    }
}
