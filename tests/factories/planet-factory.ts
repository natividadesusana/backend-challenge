import { PlanetRepository } from "repositories";
import { StationRepository } from "repositories";

let originalFindPlanetByName;
let originalCreatePlanet;
let originalCheckIfPlanetHasStations;

export function mockPlanetRepository() {
  originalFindPlanetByName = PlanetRepository.findPlanetByName;
  originalCreatePlanet = PlanetRepository.createPlanet;

  PlanetRepository.findPlanetByName = jest.fn();
  PlanetRepository.createPlanet = jest.fn();
}

export function mockStationRepository() {
  originalCheckIfPlanetHasStations = StationRepository.checkIfPlanetHasStations;
  StationRepository.checkIfPlanetHasStations = jest.fn();
}

export function restoreAllMocks() {
  PlanetRepository.findPlanetByName = originalFindPlanetByName;
  PlanetRepository.createPlanet = originalCreatePlanet;
  StationRepository.checkIfPlanetHasStations = originalCheckIfPlanetHasStations;
}
