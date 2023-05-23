import { useMemo } from 'react'

export const DOTS = -1

const range = (start: number, end: number) => {
	const length = end - start + 1

	return Array.from({ length }, (_, idx) => idx + start)
}

type PaginationProps = {
	pageSize: number
	total: number
	siblingCount?: number
	currentPage: number
}

export const usePagination = ({
	pageSize,
	total,
	siblingCount = 1,
	currentPage
}: PaginationProps) => {
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(total / pageSize)

		// Tổng số trang muốn hiển thị bằng số silbing count + trang đầu + trang cuối + 2 dấu ... mỗi bên
		// Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
		const totalPageNumbers = siblingCount + 5

		/*
        Case 1:
		Nếu tổng số lượng trang < số lượng page muốn show thì trả về range [1 -> tổng số lượng page]
        If the number of pages is less than the page numbers we want to show in our
        paginationComponent, we return the range [1..totalPageCount]
        */
		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount)
		}

		/*
		Tính index của sibling left và right và 2 index đó nằm trong khoảng [1 -> tổng số lượng page]
        Calculate left and right sibling index and make sure they are within range 1 and totalPageCount

		Vị trí leftsibling = max(trang hiện tại - siblingCount, 1).
		VD: current = 5, siblingCount = 1 => leftSiblingIndex = max(5 - 1, 1) = 4
		1 ... 4 5 6 ... 10. Vị trí leftSibling = chỉ số trang (leftSibling index = 4 = trang số 4)
        */
		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)

		/**
		Vị trí rightSibling = min(trang hiện tại + siblingCount, tổng số trang có).
		VD: current = 5, siblingCount = 1, có tổng 10 trang => leftSiblingIndex = min(5 + 1, 10) = 6
		1 ... 4 5 6 ... 10. Vị trí rightSibling = chỉ số trang (rightSibling index = 6 = trang số 6)
		 */
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPageCount
		)

		/*
        We do not show dots just when there is just one page number to be inserted between the extremes 
		of sibling and the page limits i.e 1 and totalPageCount.
        Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2

		Muốn cách 2 phần tử thì mới hiện ... 
		Nên là  leftDots show khi leftSiblingIndex > 2
				rightDots show khi rightSiblingIndex < Tổng số trang có - 2
        */
		const shouldShowLeftDots = leftSiblingIndex > 2
		const shouldShowRightDots = rightSiblingIndex <= totalPageCount - 2

		/*
        Case 2: No left dots to show, but rights dots to be shown
		Chỉ show dots bên phải
        */
		if (!shouldShowLeftDots && shouldShowRightDots) {
			// Số lượng item bên trái muốn show khi không có dots
			let leftItemCount = 2 + 2 * siblingCount
			// leftRange là 1 mảng chứa các item bên trái
			// 1, 2, 3, 4, 5 ... 10 => leftRange = [1, 2, 3, 4, 5]
			let leftRange = range(1, leftItemCount)

			// Trả về range [1, 2, 3, 4, 5, ..., 10]
			return [...leftRange, DOTS, totalPageCount]
		}

		const firstPageIndex = 1
		/*
		Case 3: No right dots to show, but left dots to be shown
		Chỉ show dots bên trái
		*/
		if (shouldShowLeftDots && !shouldShowRightDots) {
			// Tương tự như Case 2
			let rightItemCount = 2 + 2 * siblingCount
			let rightRange = range(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			)
			return [firstPageIndex, DOTS, ...rightRange]
		}

		const lastPageIndex = totalPageCount

		/*
		Case 4: Both left and right dots to be shown
		Show dots 2 bên 
		*/
		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSiblingIndex, rightSiblingIndex)
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
		}
	}, [pageSize, total, siblingCount, currentPage])

	return paginationRange
}
