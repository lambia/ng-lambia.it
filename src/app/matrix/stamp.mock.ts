import { Stamp } from './stamp';

export const STAMPS: Stamp[] = [
    { id: 0, title: 'zero', visible: false, country: ["test"], category: ["test"] },
    { id: 1, title: 'BMW', visible: true, country: ["Germany"], category: ["sporty"] },
    { id: 2, title: 'Mercedes', visible: true, country: ["Germany"], category: ["sporty"] },
    { id: 3, title: 'FIAT', visible: true, country: ["Italy"], category: ["cheap"] },
    { id: 4, title: 'Alfa Romeo', visible: true, country: ["Italy"], category: ["sporty", "cheap"] },
    { id: 5, title: 'Tesla', visible: true, country: ["USA"], category: ["sporty"] }
];