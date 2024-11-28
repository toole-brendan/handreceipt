#!/bin/bash

echo "Updating import paths..."

# Update component imports
find src -type f -name "*.tsx" -o -name "*.ts" | while read -r file; do
    # Update @/ui/components paths to @shared/components or @features
    sed -i '' 's|from "@/ui/components/common/Header"|from "@shared/components/layout/Header"|g' "$file"
    sed -i '' 's|from "@/ui/components/common/ErrorBoundary"|from "@shared/components/feedback/ErrorBoundary"|g' "$file"
    sed -i '' 's|from "@/ui/components/common/|from "@shared/components/common/|g' "$file"
    sed -i '' 's|from "@/ui/components/|from "@features/|g' "$file"
    
    # Update relative ui/components paths
    sed -i '' 's|from "../ui/components/common/Header"|from "@shared/components/layout/Header"|g' "$file"
    sed -i '' 's|from "../ui/components/common/ErrorBoundary"|from "@shared/components/feedback/ErrorBoundary"|g' "$file"
    sed -i '' 's|from "../ui/components/common/|from "@shared/components/common/|g' "$file"
    sed -i '' 's|from "../ui/components/|from "@features/|g' "$file"
    
    # Update style imports
    sed -i '' 's|from "@/ui/styles/app.css"|from "@styles/app.css"|g' "$file"
    sed -i '' 's|import "@/ui/styles/app.css"|import "@styles/app.css"|g' "$file"
    sed -i '' 's|from "@/ui/styles/|from "@styles/|g' "$file"
    sed -i '' 's|from "../ui/styles/|from "@styles/|g' "$file"
    sed -i '' 's|from "../../ui/styles/|from "@styles/|g' "$file"
    
    # Update service imports
    sed -i '' 's|from "@/services/|from "@features/|g' "$file"
    sed -i '' 's|from "../services/|from "@features/|g' "$file"
    sed -i '' 's|from "../../services/|from "@features/|g' "$file"
    
    # Update hook imports
    sed -i '' 's|from "@/hooks/|from "@features/|g' "$file"
    sed -i '' 's|from "../hooks/|from "@features/|g' "$file"
    sed -i '' 's|from "../../hooks/|from "@features/|g' "$file"
done

echo "Import paths updated! Please verify the changes." 