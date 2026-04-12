import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormIncidencia from "../components/Formularios/FormIncidencia/FormIncidencia";

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  })),
}));

describe("FormIncidencia - Select tipoIncidencia", () => {
  test("debe renderizar el select con opciones", () => {
    render(<FormIncidencia onClose={() => {}} />);
    const select = screen.getByLabelText("Tipo de Incidencia *");
    expect(select).toBeInTheDocument();
    expect(select.options.length).toBe(5);
  });

  test("debe cambiar el valor al seleccionar una opción", () => {
    render(<FormIncidencia onClose={() => {}} />);
    const select = screen.getByLabelText("Tipo de Incidencia *");
    fireEvent.change(select, { target: { value: "Otro" } });
    expect(select.value).toBe("Otro");
  });
});