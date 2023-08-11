export interface Person {
  id: number
  firstName: string
  lastName: string
  dob: string
  skills: string | string[]
  addressStreet: string
  addressCity: string
  addressRegion: string
  addressPostal: string
  addressCountry: string
}
export interface Column {
  name: string
  field: string | string[]
  properties: {
    renderer: {
      type: string
      format?: string
      highlight?: string
    }
  }
}

export interface Address extends Column {
  properties: {
    renderer: {
      type: string
      address1?: string
      city?: string
      region?: string
      postal?: string
      country?: string
    }
  }
}

export interface Grid {
  title: string
  description: string
  columnDefs: Column & Address[]
}
