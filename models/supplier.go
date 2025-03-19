package models

import "gorm.io/gorm"

type Supplier struct {
	gorm.Model
	Name          string `json:"name"`
	ContactPerson string `json:"contact_person"`
	Phone         string `json:"phone"`
	Email         string `json:"email"`
	Address       string `json:"address"`
	City          string `json:"city"`
	Country       string `json:"country"`
	Website       string `json:"website"`
}
	

