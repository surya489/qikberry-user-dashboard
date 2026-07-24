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

const PHOTO_SKELETON_ROW_COUNT = 3;

const PhotosPage = () => {
  const { data: photos, loading, error } = useAsyncData<PhotoType[]>("photos", getPhotos, []);
  const [query, setQuery] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState("all");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PHOTOS_PER_PAGE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    setVisibleCount(PHOTOS_PER_PAGE);
    setIsLoadingMore(false);
  }, [debouncedQuery, selectedAlbumId]);

  useEffect(() => {
    if (!sentinelRef.current || !hasMorePhotos || loading || isSearching) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsLoadingMore(true);
          window.setTimeout(() => {
            setVisibleCount((current) =>
              Math.min(current + PHOTOS_PER_PAGE, filteredPhotos.length)
            );
            setIsLoadingMore(false);
          }, 400);
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
          onChange={setQuery}
          placeholder="Search photos by title"
          filterSlot={
            <FilterSelect
              id="album-filter"
              label="Filter by album"
              value={selectedAlbumId}
              onChange={setSelectedAlbumId}
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
            skeletonCount={PHOTO_SKELETON_ROW_COUNT}
            skeletonVariant="photo"
          >
            {visiblePhotos.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {visiblePhotos.map((photo) => (
                    <PhotoCard
                      key={photo.id}
                      id={photo.id}
                      title={photo.title}
                      imageUrl={photo.thumbnailUrl}
                      fullImageUrl={photo.url}
                      albumId={photo.albumId}
                    />
                  ))}
                </div>

                {hasMorePhotos ? (
                  <div ref={sentinelRef} className="mt-6">
                    {isLoadingMore ? (
                      <LoadingSkeleton
                        count={PHOTO_SKELETON_ROW_COUNT}
                        variant="photo"
                      />
                    ) : (
                      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        Scroll for more photos
                      </p>
                    )}
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
