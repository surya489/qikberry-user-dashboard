import { useEffect, useMemo, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";

import { getPhotos } from "@/api/photosApi";
import PageLayout from "@/components/layout/PageLayout/PageLayout";
import PhotoCard from "@/components/photos/PhotoCard/PhotoCard";
import AsyncContent from "@/components/shared/AsyncContent/AsyncContent";
import ContentPanel from "@/components/shared/ContentPanel/ContentPanel";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import FilterSelect from "@/components/shared/FilterSelect/FilterSelect";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton/LoadingSkeleton";
import ScrollToTop from "@/components/shared/ScrollToTop/ScrollToTop";
import SearchFilterBar from "@/components/shared/SearchFilterBar/SearchFilterBar";
import { useAsyncData } from "@/hooks/useAsyncData";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import type { PhotoType } from "@/types/photo";
import { PHOTOS_PER_PAGE, SCROLL_TOP_THRESHOLD, SEARCH_DEBOUNCE_MS } from "@/utils/constants";

const INITIAL_PHOTO_SKELETON_COUNT = 9;
const DESKTOP_COLUMN_COUNT = 3;
const EXTRA_SKELETON_ROWS = 1;
const LOAD_MORE_DELAY_MS = 1000;

const PhotosPage = () => {
  const { data: photos, loading, error } = useAsyncData<PhotoType[]>("photos", getPhotos, []);
  const [query, setQuery] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState("all");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PHOTOS_PER_PAGE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isLoadingMoreRef = useRef(false);
  const loadMoreTimerRef = useRef<number | null>(null);
  const showScrollTop = useScrollThreshold(SCROLL_TOP_THRESHOLD);
  const { debouncedValue: debouncedQuery, isPending: isSearching } = useDebouncedValue(
    query,
    SEARCH_DEBOUNCE_MS
  );

  const albumOptions = useMemo(() => {
    return [...new Set(photos.map((photo) => photo.albumId))].sort((a, b) => a - b);
  }, [photos]);

  const albumFilterOptions = useMemo(
    () => [
      { value: "all", label: "All albums" },
      ...albumOptions.map((albumId) => ({
        value: String(albumId),
        label: `Album ${albumId}`,
      })),
    ],
    [albumOptions]
  );

  const filteredPhotos = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    return photos.filter((photo) => {
      const matchesQuery =
        !normalizedQuery || photo.title.toLowerCase().includes(normalizedQuery);

      const matchesAlbum =
        selectedAlbumId === "all" || photo.albumId === Number(selectedAlbumId);

      return matchesQuery && matchesAlbum;
    });
  }, [photos, debouncedQuery, selectedAlbumId]);

  const visiblePhotos = filteredPhotos.slice(0, visibleCount);
  const hasMorePhotos = visibleCount < filteredPhotos.length;
  const incompleteRowSlots =
    (DESKTOP_COLUMN_COUNT - (visiblePhotos.length % DESKTOP_COLUMN_COUNT)) %
    DESKTOP_COLUMN_COUNT;
  const loadingSkeletonCount =
    incompleteRowSlots + DESKTOP_COLUMN_COUNT * EXTRA_SKELETON_ROWS;

  const resetVisiblePhotos = () => {
    if (loadMoreTimerRef.current !== null) {
      window.clearTimeout(loadMoreTimerRef.current);
      loadMoreTimerRef.current = null;
    }
    setVisibleCount(PHOTOS_PER_PAGE);
    setIsLoadingMore(false);
    isLoadingMoreRef.current = false;
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    resetVisiblePhotos();
  };

  const handleAlbumChange = (value: string) => {
    setSelectedAlbumId(value);
    resetVisiblePhotos();
  };

  useEffect(() => {
    if (!sentinelRef.current || !hasMorePhotos || loading || isSearching) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isLoadingMoreRef.current) {
          isLoadingMoreRef.current = true;
          setIsLoadingMore(true);
          loadMoreTimerRef.current = window.setTimeout(() => {
            setVisibleCount((current) =>
              Math.min(current + PHOTOS_PER_PAGE, filteredPhotos.length)
            );
            setIsLoadingMore(false);
            isLoadingMoreRef.current = false;
            loadMoreTimerRef.current = null;
          }, LOAD_MORE_DELAY_MS);
        }
      },
      { rootMargin: "240px" }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [filteredPhotos.length, hasMorePhotos, loading, isSearching]);

  return (
    <PageLayout>
      <ContentPanel
        title="Photos"
        subtitle="Search and browse your photo collection"
        icon={<ImageIcon size={20} />}
      >
        <SearchFilterBar
          value={query}
          onChange={handleQueryChange}
          placeholder="Search photos by title"
          filterSlot={
            <FilterSelect
              id="album-filter"
              label="Filter by album"
              value={selectedAlbumId}
              onChange={handleAlbumChange}
              options={albumFilterOptions}
              placeholder="All albums"
            />
          }
        />

        <div className="mt-6">
          <AsyncContent
            loading={loading}
            error={error}
            isSearching={isSearching}
            skeletonCount={INITIAL_PHOTO_SKELETON_COUNT}
            skeletonVariant="photo"
          >
            {visiblePhotos.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {visiblePhotos.map((photo) => (
                    <div key={photo.id} className="photo-card-enter">
                      <PhotoCard
                        id={photo.id}
                        title={photo.title}
                        imageUrl={photo.thumbnailUrl}
                        fullImageUrl={photo.url}
                        albumId={photo.albumId}
                      />
                    </div>
                  ))}
                  {isLoadingMore ? (
                    <LoadingSkeleton
                      count={loadingSkeletonCount}
                      variant="photo"
                      inline
                    />
                  ) : null}
                </div>

                {hasMorePhotos ? (
                  <div ref={sentinelRef} className="mt-6">
                    {!isLoadingMore ? (
                      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        Scroll for more photos
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </>
            ) : (
              <EmptyState
                title="No photos found"
                description="Try a different keyword or album filter to refine your search."
              />
            )}
          </AsyncContent>
        </div>
      </ContentPanel>

      <ScrollToTop visible={showScrollTop} />
    </PageLayout>
  );
};

export default PhotosPage;
