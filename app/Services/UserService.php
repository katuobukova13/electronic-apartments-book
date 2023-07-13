<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route as RouteFacade;

class UserService
{
    public function create(User $user, array $data)
    {
        return $user->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);
    }

    /**
     * @throws Exception
     */
    public function createToken(User $user, array $data): string
    {
        if (empty($data['name']))
            throw new Exception("Token name is required!");

        if (empty($data['abilities']))
            throw new Exception("Token abilities is required!");

        $this->checkTokenAbilities($data['abilities']);

        return $user
            ->createToken($data['name'], $data['abilities'])
            ->plainTextToken;
    }

    /**
     * @throws Exception
     */
    private function checkTokenAbilities(array $abilities): void
    {
        $possibleAbilities = collect(RouteFacade::getRoutes()->getRoutes())
            ->map(fn(Route $route) => $route->getName())
            ->filter()
            ->add('*');

        if (
            collect($abilities)->every(fn($ability) => $possibleAbilities->contains($ability)) === false
        )
            throw new Exception(
                "Abilities must contain one of following values: {$possibleAbilities->values()}"
            );
    }
}
