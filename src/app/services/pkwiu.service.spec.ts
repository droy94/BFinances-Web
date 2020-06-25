import { TestBed } from "@angular/core/testing";

import { PkwiuService } from "./pkwiu.service";

describe("PkwiuService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PkwiuService = TestBed.get(PkwiuService);
    expect(service).toBeTruthy();
  });
});
