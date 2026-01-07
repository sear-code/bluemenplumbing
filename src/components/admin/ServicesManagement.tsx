'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { 
  Wrench, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  DollarSign,
  Clock,
  FolderOpen,
  Loader2
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { ServiceCategory, ServiceItem } from '@/models/Quote'
import * as adminServiceApi from '@/services/adminServiceApi'

// Category Form Component - Moved outside to prevent re-creation on each render
const CategoryForm = ({ 
  categoryFormData, 
  setCategoryFormData 
}: { 
  categoryFormData: {
    name: string
    description: string
    priceRangeMin: string
    priceRangeMax: string
    estimatedDuration: string
  }
  setCategoryFormData: React.Dispatch<React.SetStateAction<{
    name: string
    description: string
    priceRangeMin: string
    priceRangeMax: string
    estimatedDuration: string
  }>>
}) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="cat-name">Category Name *</Label>
      <Input
        id="cat-name"
        value={categoryFormData.name}
        onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
        placeholder="Enter category name"
        className="mt-1"
      />
    </div>

    <div>
      <Label htmlFor="cat-description">Description *</Label>
      <Textarea
        id="cat-description"
        value={categoryFormData.description}
        onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
        placeholder="Enter category description"
        className="mt-1"
        rows={3}
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="priceMin">Min Price ($) *</Label>
        <Input
          id="priceMin"
          type="number"
          value={categoryFormData.priceRangeMin}
          onChange={(e) => setCategoryFormData({ ...categoryFormData, priceRangeMin: e.target.value })}
          placeholder="0"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="priceMax">Max Price ($) *</Label>
        <Input
          id="priceMax"
          type="number"
          value={categoryFormData.priceRangeMax}
          onChange={(e) => setCategoryFormData({ ...categoryFormData, priceRangeMax: e.target.value })}
          placeholder="0"
          className="mt-1"
        />
      </div>
    </div>

    <div>
      <Label htmlFor="cat-duration">Estimated Duration (minutes) *</Label>
      <Input
        id="cat-duration"
        type="number"
        value={categoryFormData.estimatedDuration}
        onChange={(e) => setCategoryFormData({ ...categoryFormData, estimatedDuration: e.target.value })}
        placeholder="0"
        className="mt-1"
      />
    </div>
  </div>
)

// Service Form Component - Moved outside to prevent re-creation on each render
const ServiceForm = ({ 
  formData, 
  setFormData, 
  categories 
}: { 
  formData: {
    name: string
    description: string
    unitPrice: string
    estimatedDuration: string
    partsExtra: boolean
    category: string
  }
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string
    description: string
    unitPrice: string
    estimatedDuration: string
    partsExtra: boolean
    category: string
  }>>
  categories: ServiceCategory[]
}) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="name">Service Name *</Label>
      <Input
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Enter service name"
        className="mt-1"
      />
    </div>

    <div>
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Enter service description"
        className="mt-1"
        rows={3}
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="unitPrice">Unit Price ($) *</Label>
        <Input
          id="unitPrice"
          type="number"
          value={formData.unitPrice}
          onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
          placeholder="0"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="duration">Duration (minutes) *</Label>
        <Input
          id="duration"
          type="number"
          value={formData.estimatedDuration}
          onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
          placeholder="0"
          className="mt-1"
        />
      </div>
    </div>

    <div>
      <Label htmlFor="category">Category *</Label>
      <Select
        value={formData.category}
        onValueChange={(value) => setFormData({ ...formData, category: value })}
      >
        <SelectTrigger className="mt-1">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="flex items-center space-x-2">
      <input
        id="partsExtra"
        type="checkbox"
        checked={formData.partsExtra}
        onChange={(e) => setFormData({ ...formData, partsExtra: e.target.checked })}
        className="rounded border-gray-300 text-[#4492AC] focus:ring-[#4492AC]"
      />
      <Label htmlFor="partsExtra" className="cursor-pointer">
        Parts are extra (not included in price)
      </Label>
    </div>
  </div>
)

const ServicesManagement = () => {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false)
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false)
  const [editingService, setEditingService] = useState<ServiceItem | null>(null)
  
  // Category management state
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null)
  
  // Data state
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Form state for new/edit service
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unitPrice: '',
    estimatedDuration: '',
    partsExtra: false,
    category: ''
  })

  // Form state for new/edit category
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    description: '',
    priceRangeMin: '',
    priceRangeMax: '',
    estimatedDuration: ''
  })

  // Load services on mount
  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      setIsLoading(true)
      const data = await adminServiceApi.fetchServices()
      setCategories(data)
    } catch (error) {
      console.error('Error loading services:', error)
      toast({
        title: 'Error',
        description: 'Failed to load services. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const allServices = categories.flatMap(cat => 
    cat.items.map(item => ({
      ...item,
      categoryName: cat.name,
      categoryId: cat.id
    }))
  )

  // Filter services
  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || service.categoryId === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddService = async () => {
    try {
      setIsSaving(true)
      await adminServiceApi.createItem({
        categoryId: formData.category,
        name: formData.name,
        description: formData.description || undefined,
        unitPrice: parseInt(formData.unitPrice),
        partsExtra: formData.partsExtra,
        estimatedDuration: parseInt(formData.estimatedDuration),
      })
      
      toast({
        title: 'Success',
        description: 'Service created successfully',
      })
      
      setIsAddServiceOpen(false)
      resetForm()
      await loadServices()
    } catch (error) {
      console.error('Error creating service:', error)
      toast({
        title: 'Error',
        description: 'Failed to create service. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditService = (service: any) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description || '',
      unitPrice: service.unitPrice.toString(),
      estimatedDuration: service.estimatedDuration.toString(),
      partsExtra: service.partsExtra,
      category: service.categoryId
    })
    setIsEditServiceOpen(true)
  }

  const handleUpdateService = async () => {
    if (!editingService) return
    
    try {
      setIsSaving(true)
      await adminServiceApi.updateItem(editingService.id, {
        categoryId: formData.category,
        name: formData.name,
        description: formData.description || undefined,
        unitPrice: parseInt(formData.unitPrice),
        partsExtra: formData.partsExtra,
        estimatedDuration: parseInt(formData.estimatedDuration),
      })
      
      toast({
        title: 'Success',
        description: 'Service updated successfully',
      })
      
      setIsEditServiceOpen(false)
      resetForm()
      setEditingService(null)
      await loadServices()
    } catch (error) {
      console.error('Error updating service:', error)
      toast({
        title: 'Error',
        description: 'Failed to update service. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    
    try {
      await adminServiceApi.deleteItem(serviceId)
      
      toast({
        title: 'Success',
        description: 'Service deleted successfully',
      })
      
      await loadServices()
    } catch (error) {
      console.error('Error deleting service:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete service. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      unitPrice: '',
      estimatedDuration: '',
      partsExtra: false,
      category: ''
    })
  }

  const resetCategoryForm = () => {
    setCategoryFormData({
      name: '',
      description: '',
      priceRangeMin: '',
      priceRangeMax: '',
      estimatedDuration: ''
    })
  }

  // Category management handlers
  const handleAddCategory = async () => {
    try {
      setIsSaving(true)
      await adminServiceApi.createCategory({
        name: categoryFormData.name,
        description: categoryFormData.description,
        priceRangeMin: parseInt(categoryFormData.priceRangeMin),
        priceRangeMax: parseInt(categoryFormData.priceRangeMax),
        estimatedDuration: parseInt(categoryFormData.estimatedDuration),
      })
      
      toast({
        title: 'Success',
        description: 'Category created successfully',
      })
      
      setIsAddCategoryOpen(false)
      resetCategoryForm()
      await loadServices()
    } catch (error) {
      console.error('Error creating category:', error)
      toast({
        title: 'Error',
        description: 'Failed to create category. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditCategory = (category: ServiceCategory) => {
    setEditingCategory(category)
    setCategoryFormData({
      name: category.name,
      description: category.description,
      priceRangeMin: category.priceRangeMin.toString(),
      priceRangeMax: category.priceRangeMax.toString(),
      estimatedDuration: category.estimatedDuration.toString()
    })
    setIsEditCategoryOpen(true)
  }

  const handleUpdateCategory = async () => {
    if (!editingCategory) return
    
    try {
      setIsSaving(true)
      await adminServiceApi.updateCategory(editingCategory.id, {
        name: categoryFormData.name,
        description: categoryFormData.description,
        priceRangeMin: parseInt(categoryFormData.priceRangeMin),
        priceRangeMax: parseInt(categoryFormData.priceRangeMax),
        estimatedDuration: parseInt(categoryFormData.estimatedDuration),
      })
      
      toast({
        title: 'Success',
        description: 'Category updated successfully',
      })
      
      setIsEditCategoryOpen(false)
      resetCategoryForm()
      setEditingCategory(null)
      await loadServices()
    } catch (error) {
      console.error('Error updating category:', error)
      toast({
        title: 'Error',
        description: 'Failed to update category. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteCategory = async (categoryId: string, itemCount: number) => {
    const confirmMessage = itemCount > 0
      ? `This category has ${itemCount} services. Deleting it will also delete all its services. Are you sure?`
      : 'Are you sure you want to delete this category?'
    
    if (!confirm(confirmMessage)) return
    
    try {
      await adminServiceApi.deleteCategory(categoryId)
      
      toast({
        title: 'Success',
        description: 'Category deleted successfully',
      })
      
      await loadServices()
    } catch (error) {
      console.error('Error deleting category:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete category. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-[#4492AC]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
        <p className="text-gray-600 mt-1">Manage your plumbing services, categories, and pricing</p>
      </div>

      {/* Tabs for Categories and Services */}
      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Service Items</h2>
              <p className="text-sm text-gray-600">Manage individual service items</p>
            </div>

            <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#4492AC] hover:bg-[#045372]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                  <DialogDescription>
                  Create a new service that will appear in the quote calculator
                </DialogDescription>
              </DialogHeader>
              <ServiceForm formData={formData} setFormData={setFormData} categories={categories} />
              <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsAddServiceOpen(false)} disabled={isSaving}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-[#4492AC] hover:bg-[#045372]"
                    onClick={handleAddService}
                    disabled={isSaving}
                  >
                    {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Add Service
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="search">Search Services</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name or description..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category-filter">Filter by Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-500">{service.categoryName}</p>
                      </div>
                      
                      {service.description && (
                        <p className="text-gray-600 mb-3">{service.description}</p>
                      )}

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1 text-[#4492AC]">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-semibold">${service.unitPrice}</span>
                          {service.partsExtra && (
                            <span className="text-xs text-gray-500 ml-1">(+ parts)</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{service.estimatedDuration} min</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditService(service)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Edit Service Dialog */}
          <Dialog open={isEditServiceOpen} onOpenChange={setIsEditServiceOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Service</DialogTitle>
                <DialogDescription>
                  Update the service details
                </DialogDescription>
              </DialogHeader>
              <ServiceForm formData={formData} setFormData={setFormData} categories={categories} />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => {
                  setIsEditServiceOpen(false)
                  resetForm()
                  setEditingService(null)
                }} disabled={isSaving}>
                  Cancel
                </Button>
                <Button 
                  className="bg-[#4492AC] hover:bg-[#045372]"
                  onClick={handleUpdateService}
                  disabled={isSaving}
                >
                  {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Update Service
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No services found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Service Categories</h2>
              <p className="text-sm text-gray-600">Manage service category groups</p>
            </div>

            <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#4492AC] hover:bg-[#045372]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                  Create a new service category to organize your services
                </DialogDescription>
              </DialogHeader>
              <CategoryForm categoryFormData={categoryFormData} setCategoryFormData={setCategoryFormData} />
              <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)} disabled={isSaving}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-[#4492AC] hover:bg-[#045372]"
                    onClick={handleAddCategory}
                    disabled={isSaving}
                  >
                    {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Add Category
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Categories List */}
          <div className="grid grid-cols-1 gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{category.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1 text-[#4492AC]">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-semibold">
                            ${category.priceRangeMin} - ${category.priceRangeMax}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{category.estimatedDuration} min</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <FolderOpen className="h-4 w-4" />
                          <span>{category.items.length} services</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteCategory(category.id, category.items.length)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Edit Category Dialog */}
          <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogDescription>
                  Update the category details
                </DialogDescription>
              </DialogHeader>
              <CategoryForm categoryFormData={categoryFormData} setCategoryFormData={setCategoryFormData} />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => {
                  setIsEditCategoryOpen(false)
                  resetCategoryForm()
                  setEditingCategory(null)
                }} disabled={isSaving}>
                  Cancel
                </Button>
                <Button 
                  className="bg-[#4492AC] hover:bg-[#045372]"
                  onClick={handleUpdateCategory}
                  disabled={isSaving}
                >
                  {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Update Category
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ServicesManagement

