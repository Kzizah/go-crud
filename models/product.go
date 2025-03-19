package models

import "time"

type Product struct {
    ID            uint      `gorm:"primaryKey" json:"id"`
    Name          string    `gorm:"not null" json:"name"`
    Description   string    `json:"description"`
    Price        float64   `gorm:"not null" json:"price"`
    StockQuantity int       `gorm:"not null" json:"stock_quantity"`
    CategoryID    *uint     `json:"category_id"` // Nullable Foreign Key
    SupplierID    *uint     `json:"supplier_id"` // Nullable Foreign Key
    CreatedAt     time.Time `json:"created_at"`
    UpdatedAt     time.Time `json:"updated_at"`

    // Relationships
    Category Category `gorm:"foreignKey:CategoryID" json:"category"`
    Supplier Supplier `gorm:"foreignKey:SupplierID" json:"supplier"`
}
