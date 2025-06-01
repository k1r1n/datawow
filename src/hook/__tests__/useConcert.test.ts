import { renderHook } from "@testing-library/react-hooks";
import { act } from "@testing-library/react";
import { useConcert } from "../useConcert";
import callApi from "@/lib/api";
import { useSetAtom } from "jotai";
import { Concert, ConcertList } from "@/types/concert";

// Mock dependencies
jest.mock("@/lib/api");
jest.mock("jotai", () => ({
  ...jest.requireActual("jotai"), // Preserve other jotai exports
  useSetAtom: jest.fn(),
}));
jest.mock("@/store/concert", () => ({
  concertsAtom: jest.fn().mockReturnValue({ key: "mockConcertsAtom" }), // Make it a mock fn if needed or ensure usage
}));

const mockCallApi = callApi as jest.Mock;
const mockUseSetAtom = useSetAtom as jest.Mock;
let mockSetConcertsAtom: jest.Mock;

const initialMockConcertList: ConcertList = {
  list: [
    { id: "1", name: "Concert 1", description: "Desc 1", seat: 100 },
    { id: "2", name: "Concert 2", description: "Desc 2", seat: 200 },
  ],
  totalSeats: 300,
};

const emptyMockConcertList: ConcertList = {
  list: [],
  totalSeats: 0,
};

// This reflects the hook's current behavior of setting to [] on error.
// Ideally, the hook should set it to emptyMockConcertList.
const erroneousEmptyArrayConcertsState = [] as unknown as ConcertList;

describe("useConcert Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSetConcertsAtom = jest.fn();
    mockUseSetAtom.mockReturnValue(mockSetConcertsAtom);
  });

  describe("Initial state and fetchConcertsData on mount", () => {
    it("should set initial state and fetch concerts successfully on mount", async () => {
      mockCallApi.mockResolvedValue({ data: initialMockConcertList });

      const { result, waitForNextUpdate } = renderHook(() => useConcert());

      expect(result.current.loading).toBe(true);
      expect(result.current.concerts.list).toEqual([]);
      expect(result.current.concerts.totalSeats).toEqual(0);
      expect(result.current.error).toBeNull();

      await waitForNextUpdate();

      expect(result.current.loading).toBe(false);
      expect(result.current.concerts).toEqual(initialMockConcertList);
      expect(result.current.error).toBeNull();
      expect(mockSetConcertsAtom).toHaveBeenCalledWith(initialMockConcertList);
      expect(mockCallApi).toHaveBeenCalledWith("/concerts");
    });

    it("should handle fetch concerts failure (generic error) on mount", async () => {
      const genericErrorMessage =
        "An unknown error occurred while creating the concert.";
      mockCallApi.mockRejectedValue(new Error("Network Error")); // Simulates a generic error

      const { result, waitForNextUpdate } = renderHook(() => useConcert());

      expect(result.current.loading).toBe(true);
      await waitForNextUpdate();

      expect(result.current.loading).toBe(false);
      expect(result.current.concerts).toEqual(erroneousEmptyArrayConcertsState);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(genericErrorMessage);
      expect(mockSetConcertsAtom).toHaveBeenCalledWith(
        erroneousEmptyArrayConcertsState
      );
    });

    it("should handle fetch concerts failure (error with message property) on mount", async () => {
      const specificErrorMessage = "API Fetch Failed";
      mockCallApi.mockRejectedValue({ message: specificErrorMessage });

      const { result, waitForNextUpdate } = renderHook(() => useConcert());

      expect(result.current.loading).toBe(true);
      await waitForNextUpdate();

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(specificErrorMessage);
      expect(result.current.concerts).toEqual(erroneousEmptyArrayConcertsState);
      expect(mockSetConcertsAtom).toHaveBeenCalledWith(
        erroneousEmptyArrayConcertsState
      );
    });
  });

  describe("createConcert", () => {
    const newConcertData: Omit<Concert, "id"> = {
      name: "New Concert",
      description: "New Desc",
      seat: 50,
    };
    const createdConcert: Concert = { id: "3", ...newConcertData };

    it("should create a concert successfully", async () => {
      mockCallApi.mockResolvedValueOnce({ data: initialMockConcertList });
      const { result, waitForNextUpdate } = renderHook(() => useConcert());
      await waitForNextUpdate();

      mockCallApi.mockResolvedValueOnce({ data: createdConcert });
      mockSetConcertsAtom.mockImplementation((updateFn) => {
        if (typeof updateFn === "function") {
          mockSetConcertsAtom(updateFn(result.current.concerts));
        } else {
          mockSetConcertsAtom(updateFn);
        }
      });

      await act(async () => {
        await result.current.createConcert(newConcertData);
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.concerts.list).toContainEqual(createdConcert);
      expect(result.current.concerts.list.length).toBe(
        initialMockConcertList.list.length + 1
      );
      expect(result.current.error).toBeNull();
      expect(mockCallApi).toHaveBeenCalledWith("/concerts", {
        method: "POST",
        data: JSON.stringify(newConcertData),
        headers: { "Content-Type": "application/json" },
      });
      const lastAtomCallArg =
        mockSetConcertsAtom.mock.calls[
          mockSetConcertsAtom.mock.calls.length - 1
        ][0];
      expect(lastAtomCallArg.list).toContainEqual(createdConcert);
    });

    it("should handle create concert failure (generic error)", async () => {
      const genericCreateErrorMessage =
        "An unknown error occurred while creating the concert.";
      mockCallApi.mockResolvedValueOnce({ data: initialMockConcertList }); // Initial fetch
      const { result, waitForNextUpdate } = renderHook(() => useConcert());
      await waitForNextUpdate();

      mockCallApi.mockRejectedValueOnce(new Error("Network Error")); // Create fails

      await act(async () => {
        await result.current.createConcert(newConcertData);
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.concerts.list.length).toBe(
        initialMockConcertList.list.length
      ); // List unchanged
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(genericCreateErrorMessage);
    });

    it("should handle create concert failure (error with message property)", async () => {
      const specificCreateErrorMessage = "Creation Failed via API";
      mockCallApi.mockResolvedValueOnce({ data: initialMockConcertList }); // Initial fetch
      const { result, waitForNextUpdate } = renderHook(() => useConcert());
      await waitForNextUpdate();

      mockCallApi.mockRejectedValueOnce({
        message: specificCreateErrorMessage,
      }); // Create fails

      await act(async () => {
        await result.current.createConcert(newConcertData);
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(specificCreateErrorMessage);
    });
  });

  describe("deleteConcert", () => {
    const concertIdToDelete = "1"; // String, as per hook argument
    const numericIdToDelete = 1;

    it("should delete a concert successfully", async () => {
      mockCallApi.mockResolvedValueOnce({ data: initialMockConcertList });
      const { result, waitForNextUpdate } = renderHook(() => useConcert());
      await waitForNextUpdate();

      mockCallApi.mockResolvedValueOnce({});

      mockSetConcertsAtom.mockImplementation((updateFn) => {
        if (typeof updateFn === "function") {
          mockSetConcertsAtom(updateFn(result.current.concerts));
        } else {
          mockSetConcertsAtom(updateFn);
        }
      });

      await act(async () => {
        await result.current.deleteConcert(concertIdToDelete);
      });

      expect(result.current.loading).toBe(false);
      expect(
        result.current.concerts.list.find(
          (c: Concert) => Number(c.id) === numericIdToDelete
        )
      ).toBeUndefined();
      expect(result.current.concerts.list.length).toBe(
        initialMockConcertList.list.length - 1
      );
      expect(result.current.error).toBeNull();
      expect(mockCallApi).toHaveBeenCalledWith(
        `/concerts/${concertIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const lastAtomCallArg =
        mockSetConcertsAtom.mock.calls[
          mockSetConcertsAtom.mock.calls.length - 1
        ][0];
      expect(
        lastAtomCallArg.list.find(
          (c: Concert) => Number(c.id) === numericIdToDelete
        )
      ).toBeUndefined();
    });

    it("should handle delete concert failure (generic error)", async () => {
      const genericDeleteErrorMessage =
        "An unknown error occurred while deleting the concert.";
      mockCallApi.mockResolvedValueOnce({ data: initialMockConcertList }); // Initial fetch
      const { result, waitForNextUpdate } = renderHook(() => useConcert());
      await waitForNextUpdate();

      mockCallApi.mockRejectedValueOnce(new Error("Network Error")); // Delete fails

      await act(async () => {
        await result.current.deleteConcert(concertIdToDelete);
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.concerts.list.length).toBe(
        initialMockConcertList.list.length
      ); // List unchanged
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(genericDeleteErrorMessage);
    });

    it("should handle delete concert failure (error with message property)", async () => {
      const specificDeleteErrorMessage = "Deletion Failed via API";
      mockCallApi.mockResolvedValueOnce({ data: initialMockConcertList }); // Initial fetch
      const { result, waitForNextUpdate } = renderHook(() => useConcert());
      await waitForNextUpdate();

      mockCallApi.mockRejectedValueOnce({
        message: specificDeleteErrorMessage,
      }); // Delete fails

      await act(async () => {
        await result.current.deleteConcert(concertIdToDelete);
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(specificDeleteErrorMessage);
    });
  });

  describe("Error Message Fallbacks", () => {
    it("fetchConcertsData: uses fallback error message if err is null/undefined or has no message", async () => {
      const fallbackMessage =
        "An unknown error occurred while creating the concert.";
      mockCallApi.mockRejectedValueOnce(null); // Error without message

      const { result, waitForNextUpdate } = renderHook(() => useConcert());
      await waitForNextUpdate();
      expect(result.current.error?.message).toBe(fallbackMessage);

      mockCallApi.mockRejectedValueOnce({}); // Error object without message
      const { result: result2, waitForNextUpdate: waitForNextUpdate2 } =
        renderHook(() => useConcert());
      await waitForNextUpdate2();
      expect(result2.current.error?.message).toBe(fallbackMessage);
    });

    it("createConcert: uses fallback error message", async () => {
      const fallbackMessage =
        "An unknown error occurred while creating the concert.";
      mockCallApi.mockResolvedValueOnce({ data: emptyMockConcertList }); // initial fetch
      const { result, waitForNextUpdate } = renderHook(() => useConcert());
      await waitForNextUpdate();

      mockCallApi.mockRejectedValueOnce(null); // Create error without message
      await act(async () => {
        await result.current.createConcert({
          name: "test",
          description: "test",
          seat: 1,
        });
      });
      expect(result.current.error?.message).toBe(fallbackMessage);
    });

    it("deleteConcert: uses fallback error message", async () => {
      const fallbackMessage =
        "An unknown error occurred while deleting the concert.";
      mockCallApi.mockResolvedValueOnce({ data: initialMockConcertList }); // initial fetch
      const { result, waitForNextUpdate } = renderHook(() => useConcert());
      await waitForNextUpdate();

      mockCallApi.mockRejectedValueOnce(null); // Delete error without message
      await act(async () => {
        await result.current.deleteConcert("1");
      });
      expect(result.current.error?.message).toBe(fallbackMessage);
    });
  });
});
