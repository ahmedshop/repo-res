<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    public function index()
    {
        return MenuItem::all();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
        ]);

        $menuItem = MenuItem::create($validatedData);

        return response()->json($menuItem, 201);
    }

    public function show($id) 
    {
        $menuItem = MenuItem::find($id); 
        if (!$menuItem) {
            return response()->json(['error' => 'Menu item not found'], 404);
        }
        return $menuItem;
    }

    public function update(Request $request, $id) 
    {
        $menuItem = MenuItem::find($id);  
        if (!$menuItem) {
            return response()->json(['error' => 'Menu item not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric',
            'category_id' => 'sometimes|required|exists:categories,id',
        ]);

        $menuItem->update($validatedData);

        return response()->json($menuItem, 200);
    }

    public function destroy($id)  
    {
        $menuItem = MenuItem::find($id); 
        if (!$menuItem) {
            return response()->json(['error' => 'Menu item not found'], 404);
        }

        $menuItem->delete();
        return response()->json(null, 204);
    }
}
